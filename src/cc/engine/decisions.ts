import { GameState, ActiveDecision, DecisionOption } from '../types';
import { aliveActiveHeroes, pushLog, mkId, rngInt, rollChance, rngChoice } from './util';
import { ITEMS } from '../data/items';
import { addToStash } from './loot';

const DECISION_TTL_MS = 60_000;

export function triggerDecision(state: GameState, kind: 'fountain' | 'fork' | 'chest' | 'merchant' | 'resource'): void {
  if (state.activeDecision) return;
  switch (kind) {
    case 'fountain':
      state.activeDecision = mkFountain(state);
      break;
    case 'fork':
      state.activeDecision = mkFork(state);
      break;
    case 'chest':
      state.activeDecision = mkChest(state);
      break;
    case 'merchant':
      state.activeDecision = mkMerchant(state);
      break;
    case 'resource':
      state.activeDecision = mkResourceNode(state);
      break;
  }
  if (state.activeDecision) {
    pushLog(state, 'decision', `❓ ${state.activeDecision.title}`);
  }
}

function mkFountain(state: GameState): ActiveDecision {
  const priestPresent = aliveActiveHeroes(state).some(h => h.classId === 'priest');
  return {
    id: mkId('dec'),
    kind: 'fountain',
    title: 'A Strange Fountain',
    icon: '⛲',
    description: priestPresent
      ? 'The waters glow. Your priest senses only blessings here.'
      : 'Glowing waters bubble unnaturally. It could heal — or hex.',
    options: [
      { id: 'drink', label: 'Drink', description: priestPresent ? 'Random buff.' : 'Random buff OR debuff.' },
      { id: 'skip', label: 'Ignore', description: 'Leave it untouched.' },
    ],
    defaultOptionId: 'skip',
    expiresAt: Date.now() + DECISION_TTL_MS,
    context: { priestPresent },
  };
}

function mkFork(state: GameState): ActiveDecision {
  return {
    id: mkId('dec'),
    kind: 'fork',
    title: 'Fork in the Path',
    icon: '🛤️',
    description: 'The corridor splits. Which way?',
    options: [
      { id: 'left', label: 'Left (Safe)', description: 'More gold, fewer enemies.' },
      { id: 'right', label: 'Right (Risky)', description: 'Rarer loot, more danger.' },
    ],
    defaultOptionId: 'left',
    expiresAt: Date.now() + DECISION_TTL_MS,
  };
}

function mkResourceNode(state: GameState): ActiveDecision {
  const types = ['mine', 'chop', 'forage'];
  const nodeType = rngChoice(types);

  let title, icon, description, optionId, label, optDesc;
  if (nodeType === 'mine') {
    title = 'Hidden Resource Vein';
    icon = '⛏️';
    description = `A rich vein of ore glimmers in the dark. Pause to mine it?`;
    optionId = 'mine';
    label = 'Mine it';
    optDesc = `Earn ores and Mining XP.`;
  } else if (nodeType === 'chop') {
    title = 'Overgrown Roots';
    icon = '🪓';
    description = `Thick magical roots block the path. Good wood, though.`;
    optionId = 'chop';
    label = 'Chop it';
    optDesc = `Earn logs and Woodcutting XP.`;
  } else {
    title = 'Fungal Bloom';
    icon = '🍄';
    description = `A patch of strange herbs and mushrooms grows here.`;
    optionId = 'forage';
    label = 'Forage';
    optDesc = `Earn herbs and Herblore XP.`;
  }

  return {
    id: mkId('dec'),
    kind: 'resource',
    title,
    icon,
    description,
    options: [
      { id: optionId, label, description: optDesc },
      { id: 'skip', label: 'Ignore', description: 'Keep exploring.' },
    ],
    defaultOptionId: optionId,
    expiresAt: Date.now() + DECISION_TTL_MS,
    context: { isResource: true },
  };
}

function mkChest(state: GameState): ActiveDecision {
  const rogue = aliveActiveHeroes(state).find(h => h.classId === 'rogue');
  return {
    id: mkId('dec'),
    kind: 'chest',
    title: 'Suspicious Chest',
    icon: '📦',
    description: rogue ? `${rogue.name} spots a tripwire. Pick it?` : 'No rogue to pick the lock. Force it open?',
    options: [
      { id: 'force', label: 'Force open', description: 'Risk trap damage.' },
      { id: 'pick', label: 'Pick carefully', description: rogue ? 'Rogue attempts disarm.' : 'No rogue present.', disabled: !rogue },
      { id: 'skip', label: 'Walk away', description: 'Leave it.' },
    ],
    defaultOptionId: rogue ? 'pick' : 'skip',
    expiresAt: Date.now() + DECISION_TTL_MS,
  };
}

function mkMerchant(state: GameState): ActiveDecision {
  const offer = rngChoice(['greater_healing_potion', 'mana_potion', 'elixir_of_life']);
  const price = Math.floor((ITEMS[offer]?.value ?? 50) * 0.8);
  return {
    id: mkId('dec'),
    kind: 'merchant',
    title: 'Wandering Merchant',
    icon: '🧳',
    description: `A hooded figure offers 1× ${ITEMS[offer]?.name} for ${price} gp.`,
    options: [
      { id: 'buy', label: `Buy (${price} gp)`, description: `Add to stash.`, disabled: state.stash.gold < price, disabledReason: 'Not enough gold' },
      { id: 'skip', label: 'Decline', description: 'Move on.' },
    ],
    defaultOptionId: 'skip',
    expiresAt: Date.now() + DECISION_TTL_MS,
    context: { offer, price },
  };
}

export function resolveDecision(state: GameState, optionId: string): void {
  const dec = state.activeDecision;
  if (!dec) return;
  const alive = aliveActiveHeroes(state);
  switch (dec.kind) {
    case 'fountain': {
      if (optionId === 'drink') {
        const good = dec.context?.priestPresent || rollChance(0.7);
        if (good) {
          for (const h of alive) { h.hp = h.maxHp; h.mp = h.maxMp; }
          pushLog(state, 'heal', '💧 The fountain heals the party!');
        } else {
          for (const h of alive) { h.hp = Math.max(1, Math.floor(h.hp * 0.6)); }
          pushLog(state, 'system', '🩸 The waters were cursed! Party wounded.');
        }
      } else {
        pushLog(state, 'decision', 'Fountain left untouched.');
      }
      break;
    }
    case 'fork': {
      if (optionId === 'left') {
        state.stash.gold += rngInt(20, 60);
        pushLog(state, 'loot', '🪙 Safer path rewards extra gold.');
      } else {
        if (rollChance(0.4)) {
          // drop a random rare-tier item
          const pool = ['ring_of_power', 'swift_boots', 'lucky_charm'];
          const item = rngChoice(pool);
          addToStash(state, item, 1);
          pushLog(state, 'loot', `🎁 Rare find on the risky path!`, 'rare');
        } else {
          for (const h of alive) h.hp = Math.max(1, Math.floor(h.hp * 0.7));
          pushLog(state, 'system', '⚠ Ambush! Party wounded on risky path.');
        }
      }
      break;
    }
    case 'chest': {
      if (optionId === 'force') {
        if (rollChance(0.45)) {
          // Trap
          for (const h of alive) h.hp = Math.max(1, h.hp - 30);
          pushLog(state, 'system', '💥 The chest was trapped!');
        } else {
          addToStash(state, rngChoice(['greater_healing_potion', 'lucky_charm', 'iron_sword']), 1);
          pushLog(state, 'loot', '📦 Chest forced open!');
        }
      } else if (optionId === 'pick') {
        addToStash(state, rngChoice(['ring_of_power', 'lucky_charm', 'greater_healing_potion']), 1);
        pushLog(state, 'loot', '🗝 Chest picked cleanly!', 'rare');
      }
      break;
    }
    case 'resource': {
      if (optionId === 'mine') {
        const miningLvl = state.skills.mining?.level ?? 1;
        let pool = ['copper_ore', 'tin_ore'];
        if (miningLvl >= 15) pool.push('iron_ore', 'coal');
        if (miningLvl >= 30) pool.push('gold_ore', 'coal');
        if (miningLvl >= 50) pool.push('mithril_ore');
        if (miningLvl >= 70) pool.push('adamant_ore');
        if (miningLvl >= 85) pool.push('runite_ore');
        
        const picked = rngChoice(pool);
        const qty = rngInt(2, 5);
        addToStash(state, picked, qty);
        
        if (!state.skills.mining) {
          state.skills.mining = { level: 1, xp: 0 };
        }
        
        let xpGained = 30;
        if (picked === 'runite_ore') xpGained = 2500;
        else if (picked === 'adamant_ore') xpGained = 1200;
        else if (picked === 'mithril_ore') xpGained = 600;
        else if (picked === 'gold_ore') xpGained = 300;
        else if (picked === 'coal') xpGained = 200;
        else if (picked === 'iron_ore') xpGained = 150;
        else if (picked === 'tin_ore' || picked === 'copper_ore') xpGained = 50;

        state.skills.mining.xp += xpGained;
        pushLog(state, 'loot', `⛏️ Mined ${qty}x ${ITEMS[picked]?.name} and gained ${xpGained} Mining XP.`);
      } else if (optionId === 'chop') {
        const wcLvl = state.skills.woodcutting?.level ?? 1;
        let pool = ['logs'];
        if (wcLvl >= 15) pool.push('oak_logs');
        if (wcLvl >= 30) pool.push('willow_logs');
        if (wcLvl >= 45) pool.push('maple_logs');
        if (wcLvl >= 60) pool.push('yew_logs');
        if (wcLvl >= 75) pool.push('magic_logs');

        const picked = rngChoice(pool);
        const qty = rngInt(2, 5);
        addToStash(state, picked, qty);
        
        if (!state.skills.woodcutting) {
          state.skills.woodcutting = { level: 1, xp: 0 };
        }
        
        let xpGained = 40;
        if (picked === 'magic_logs') xpGained = 1000;
        else if (picked === 'yew_logs') xpGained = 350;
        else if (picked === 'maple_logs') xpGained = 200;
        else if (picked === 'willow_logs') xpGained = 100;
        else if (picked === 'oak_logs') xpGained = 75;

        state.skills.woodcutting.xp += xpGained;
        pushLog(state, 'loot', `🪓 Chopped ${qty}x ${ITEMS[picked]?.name} and gained ${xpGained} Woodcutting XP.`);
      } else if (optionId === 'forage') {
        const herbLvl = state.skills.herblore?.level ?? 1;
        const pool = ['herbs', 'vial_of_water', 'glowing_mushroom'];
        if (herbLvl >= 10) pool.push('marrentill');
        if (herbLvl >= 20) pool.push('tarromin');
        if (herbLvl >= 30) pool.push('ranarr');
        if (herbLvl >= 45) pool.push('toadflax');
        if (herbLvl >= 60) pool.push('snapdragon');
        if (herbLvl >= 75) pool.push('torstol');

        const picked = rngChoice(pool);
        const qty = rngInt(1, 4);
        addToStash(state, picked, qty);
        
        if (!state.skills.herblore) {
          state.skills.herblore = { level: 1, xp: 0 };
        }
        
        let xpGained = 60;
        if (picked === 'torstol') xpGained = 800;
        else if (picked === 'snapdragon') xpGained = 400;
        else if (picked === 'toadflax') xpGained = 250;
        else if (picked === 'ranarr') xpGained = 150;
        else if (picked === 'tarromin') xpGained = 100;
        else if (picked === 'marrentill') xpGained = 80;
        else if (picked === 'glowing_mushroom') xpGained = 120;

        state.skills.herblore.xp += xpGained;
        
        pushLog(state, 'loot', `🌿 Foraged ${qty}x ${ITEMS[picked]?.name} and gained ${xpGained} Herblore XP.`);
      } else {
        pushLog(state, 'decision', 'Ignored the resource vein.');
      }
      break;
    }
    case 'merchant': {
      if (optionId === 'buy') {
        const { offer, price } = dec.context ?? {};
        if (state.stash.gold >= price) {
          state.stash.gold -= price;
          addToStash(state, offer, 1);
          pushLog(state, 'loot', `🧳 Purchased ${ITEMS[offer]?.name}.`);
        }
      }
      break;
    }
  }
  state.activeDecision = undefined;
  // mark the tile cleared so the tick loop doesn't re-trigger this decision.
  const d = state.activeDungeon;
  if (d) {
    const tile = d.tiles.find(t => t.x === d.partyPos.x && t.y === d.partyPos.y);
    if (tile) tile.cleared = true;
  }
}
