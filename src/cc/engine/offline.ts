import { GameState, OfflineReport } from '../types';
import { pushLog } from './util';
import { SKILL_ACTIONS } from './skilling';
import { addToStash, removeFromStash } from './loot';

const MAX_OFFLINE_MS = 8 * 60 * 60 * 1000; // 8h

// Very simple offline sim: estimate tiles cleared during away time and apply batch rewards.
// Does NOT advance combat tick-for-tick (that would be expensive).
export function simulateOffline(state: GameState, awayMs: number): OfflineReport | undefined {
  const dt = Math.min(awayMs, MAX_OFFLINE_MS);
  if (dt < 30_000) return undefined; // under 30s, don't bother

  let totalXpGained = 0;
  let totalItemsFound = 0;

  if (state.town && state.town.workers) {
    for (const worker of state.town.workers) {
      if (!worker.activeTask) continue;
      const task = worker.activeTask;
      const defs = SKILL_ACTIONS ? SKILL_ACTIONS[task.skillId] || [] : [];
      const actionDef = defs.find((d: any) => d.id === task.actionId);
      
      if (actionDef) {
        let timeRemaining = dt + (task.progress || 0);
        let completedActions = 0;
        
        const hasReq = () => {
           if (!actionDef.inputs) return true;
           for (const [id, qty] of Object.entries(actionDef.inputs)) {
             if ((state.stash.items[id] ?? 0) < Number(qty)) return false;
           }
           return true;
        };

        while (timeRemaining >= actionDef.duration && hasReq()) {
          timeRemaining -= actionDef.duration;
          completedActions++;
          
          if (actionDef.inputs) {
            for (const [id, qty] of Object.entries(actionDef.inputs)) {
               removeFromStash(state, id, Number(qty));
            }
          }
          if (actionDef.outputs) {
            for (const [id, qty] of Object.entries(actionDef.outputs)) {
               addToStash(state, id, Number(qty));
            }
          }
        }
        
        const xpGained = completedActions * actionDef.xpReward;
        if (completedActions > 0) {
          totalXpGained += xpGained;
          totalItemsFound += completedActions;

          if (!state.skills[task.skillId]) {
            state.skills[task.skillId] = { level: 1, xp: 0 };
          }
          state.skills[task.skillId]!.xp += xpGained;
          
          pushLog(state, 'system', `💤 Offline Skilling: ${worker.name} completed ${completedActions} actions, +${xpGained} XP in ${task.skillId}`);
          // If it stopped due to lack of materials
          if (!hasReq()) {
            pushLog(state, 'system', `${worker.name} ran out of materials for ${actionDef.name} while offline.`);
            worker.activeTask = undefined;
          } else {
            // Carry over leftover time
            task.progress = timeRemaining;
          }
        }
      }
    }
  }

  // Allow simultaneous dungeon simulation if active
  if (!state.activeDungeon) {
    return {
      duration: dt,
      tilesCleared: 0,
      monstersKilled: 0,
      xpGained: totalXpGained,
      goldGained: 0,
      itemsFound: totalItemsFound,
    };
  }

  // Assume 8s per tile on average (move + light combat)
  const tilesCleared = Math.floor(dt / 8000);
  const estMonsters = Math.floor(tilesCleared * 1.3);
  const avgGold = 15;
  const avgXp = 30;

  const goldGained = estMonsters * avgGold;
  const xpGained = estMonsters * avgXp;

  state.stash.gold += goldGained;
  state.totalGoldEarned += goldGained;

  // Distribute xp
  const heroes = state.heroes.filter(h => !h.bench && h.state !== 'dead');
  if (heroes.length > 0) {
    const xpEach = Math.floor(xpGained / heroes.length);
    for (const h of heroes) {
      h.xp += xpEach;
      // don't bother with full level-up loop; give them the XP, they can level next real tick
    }
  }

  state.totalMonstersKilled += estMonsters;

  pushLog(state, 'system', `💤 Offline: ${tilesCleared} tiles, ${estMonsters} kills, +${goldGained} gp`);

  return {
    duration: dt,
    tilesCleared,
    monstersKilled: estMonsters,
    xpGained,
    goldGained,
    itemsFound: 0,
  };
}
