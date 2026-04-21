import React, { useState } from 'react';
import { GameState, SkillId, ActiveTask } from '../types';
import { SKILL_ACTIONS } from '../engine/skilling';
import { ITEMS } from '../../constants';

interface Props {
  state: GameState;
  setActiveTask: (skillId: string, actionId: string, duration: number, workerId?: string) => void;
  clearActiveTask: (workerId: string) => void;
  hireWorker?: () => void;
}

export const TownSkillsView: React.FC<Props> = ({ state, setActiveTask, clearActiveTask, hireWorker }) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillId>('mining');

  const skillsList: { id: SkillId; icon: string; name: string }[] = [
    { id: 'mining', icon: '⛏️', name: 'Mining' },
    { id: 'smithing', icon: '🔨', name: 'Smithing' },
    { id: 'woodcutting', icon: '🪓', name: 'Woodcutting' },
    { id: 'crafting', icon: '🧵', name: 'Crafting' },
    { id: 'herblore', icon: '🧪', name: 'Herblore' },
    { id: 'fishing', icon: '🎣', name: 'Fishing' },
    { id: 'cooking', icon: '🍳', name: 'Cooking' },
  ];

  const currentLevel = state.skills[selectedSkill]?.level || 1;
  const currentXp = state.skills[selectedSkill]?.xp || 0;
  const nextLevelXp = Math.floor(0.25 * Math.pow(currentLevel + 1, 3) * 50) || 83; // fallback for lvl 1

  const workers = state.town?.workers || [];
  const freeWorkers = workers.filter(w => !w.activeTask);
  const activeWorkers = workers.filter(w => w.activeTask && w.activeTask.skillId === selectedSkill);

  const getDef = (id: string, qty: number) => {
    const item = ITEMS[id];
    return { name: item?.name || id, icon: item?.icon || '📦', qty, id: item?.id };
  };

  return (
    <div className="h-full flex flex-col sm:flex-row bg-[#0D0B09]">
      {/* Skill list sidebar */}
      <div className="w-full sm:w-48 shrink-0 bg-[#14100C] border-r border-[#3D3328] flex flex-col p-2 gap-1 overflow-y-auto">
        <div className="text-[10px] uppercase tracking-widest text-[#7A6E60] font-bold px-2 py-1 mb-1">
          Town Skills
        </div>
        {skillsList.map(s => {
          const workersOnSkill = workers.filter(w => w.activeTask?.skillId === s.id);
          const isActiveSkill = workersOnSkill.length > 0;
          const lvl = state.skills[s.id]?.level || 1;
          return (
            <button key={s.id} onClick={() => setSelectedSkill(s.id)}
                    className={`flex items-center gap-2 p-2 rounded text-sm transition-colors text-left relative
                      ${selectedSkill === s.id ? 'bg-[#2B231B] border-l-2 border-[#D4A943]' : 'hover:bg-[#1E1A16] border-l-2 border-transparent'}
                    `}>
              <span className="text-lg w-6 shrink-0 text-center">{s.icon}</span>
              <div className="flex-1 min-w-0 flex justify-between items-center">
                <span className={`truncate ${selectedSkill === s.id ? 'text-[#F2E6A8]' : 'text-[#B8A890]'}`}>{s.name}</span>
                <span className="text-xs text-[#D4A943] ml-1">L{lvl}</span>
              </div>
              {isActiveSkill && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#7FE2A0] shadow-[0_0_8px_#7FE2A0]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main panel */}
      <div className="flex-1 flex flex-col overflow-y-auto p-4 relative">
        <div className="flex justify-between items-center bg-[#14100C] border border-[#3D3328] rounded-xl p-3 mb-4 shadow-md">
          <div className="font-bold text-[#F2E6A8] text-sm uppercase tracking-widest">
            Worker Roster
          </div>
          <div className="text-sm font-bold text-[#D4A943]">
            {freeWorkers.length} / {workers.length} Idle
          </div>
        </div>

        {/* Worker roster grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
          {workers.map(w => {
            const isIdle = !w.activeTask;
            const taskDef = w.activeTask ? SKILL_ACTIONS[w.activeTask.skillId]?.find(a => a.id === w.activeTask!.actionId) : null;
            const icon = w.activeTask ? skillsList.find(s => s.id === w.activeTask!.skillId)?.icon : '💤';
            return (
              <div key={w.id} className={`p-3 rounded-xl border ${isIdle ? 'bg-[#1A1512] border-[#3D3328]' : 'bg-[#1A2E20] border-[#4EBA6F] shadow-[0_0_15px_rgba(78,186,111,0.15)]'} flex flex-col gap-2 relative overflow-hidden transition-colors`}>
                <div className="flex items-center justify-between">
                  {isIdle ? (
                    <span className="font-bold text-[#B8A890] truncate">{w.name}</span>
                  ) : (
                    <span className="font-bold text-[#A3E6B5] truncate">{w.name}</span>
                  )}
                  <span className={`text-sm shrink-0 ${!isIdle && 'animate-pulse'}`}>{icon}</span>
                </div>
                {isIdle ? (
                  <div className="text-xs text-[#7A6E60]">Idle</div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="text-xs text-[#4EBA6F] truncate">{taskDef?.name || 'Working...'}</div>
                    <div className="w-full bg-[#0A1A10] h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#4EBA6F]" style={{ width: `${(w.activeTask!.progress / w.activeTask!.duration) * 100}%`, transition: 'width 0.2s linear' }} />
                    </div>
                  </div>
                )}
                {!isIdle && (
                  <button onClick={() => clearActiveTask(w.id)} className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#E86E6E20] text-[#E86E6E] hover:bg-[#E86E6E40] border border-[#E86E6E80] rounded text-[9px] uppercase tracking-widest font-bold">
                    Stop
                  </button>
                )}
              </div>
            );
          })}
          {/* Hire worker card */}
          {hireWorker && (
            <button 
              onClick={hireWorker}
              className={`p-3 rounded-xl border border-dashed flex flex-col items-center justify-center gap-1 transition-colors
                ${state.stash.gold >= (1000 * Math.pow(2, workers.length - 3)) 
                  ? 'bg-[#14100C] border-[#D4A943]/50 text-[#D4A943] hover:bg-[#2B231B] hover:border-[#D4A943]' 
                  : 'bg-[#0D0B09] border-[#3D3328] text-[#7A6E60] cursor-not-allowed'}`}
              disabled={state.stash.gold < (1000 * Math.pow(2, workers.length - 3))}
            >
              <div className="font-bold text-sm">Hire Worker</div>
              <div className="text-xs flex items-center gap-1">
                <span>🪙</span>
                <span>{(1000 * Math.pow(2, workers.length - 3)).toLocaleString()}</span>
              </div>
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 mb-6 sticky top-0 bg-[#0D0B09]/90 backdrop-blur-sm p-4 rounded-xl border border-[#3D3328] z-10 shadow-xl">
          <div className="text-4xl">{skillsList.find(s => s.id === selectedSkill)?.icon}</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#F2E6A8]" style={{ fontFamily: "'Cinzel', serif" }}>
              {skillsList.find(s => s.id === selectedSkill)?.name}
            </h2>
            <div className="text-sm text-[#B8A890] mt-1 flex items-center justify-between">
              <span>Level {currentLevel}</span>
              <span>{Math.floor(currentXp).toLocaleString()} / {nextLevelXp.toLocaleString()} XP</span>
            </div>
            <div className="w-full bg-[#14100C] h-2 rounded mt-1 overflow-hidden border border-[#3D3328]">
              <div className="h-full bg-[linear-gradient(90deg,#9a8030_0%,#ffe080_100%)]"
                   style={{ width: `${Math.min(100, (currentXp / nextLevelXp) * 100)}%` }} />
            </div>
          </div>
        </div>

        {/* Current task feedback */}
        {activeWorkers.length > 0 && activeWorkers.map(worker => {
          const activeTask = worker.activeTask!;
          return (
            <div key={worker.id} className="mb-4 p-4 rounded bg-[#1A2E20] border border-[#2D4A35] flex items-center gap-4">
              <div className="text-2xl animate-spin" style={{ animationDuration: '3s' }}>{skillsList.find(s => s.id === selectedSkill)?.icon}</div>
              <div className="flex-1">
                <div className="text-[#A3E6B5] font-bold text-sm mb-1">{worker.name} - {SKILL_ACTIONS[selectedSkill]?.find(a => a.id === activeTask.actionId)?.name}</div>
                <div className="w-full bg-[#0A1A10] h-3 rounded overflow-hidden">
                  <div className="h-full bg-[#4EBA6F]" style={{ width: `${(activeTask.progress / activeTask.duration) * 100}%`, transition: 'width 0.2s linear' }} />
                </div>
              </div>
              <button onClick={() => clearActiveTask(worker.id)} className="px-3 py-1 bg-[#E86E6E20] text-[#E86E6E] hover:bg-[#E86E6E40] border border-[#E86E6E80] rounded text-xs uppercase tracking-widest font-bold">
                Stop
              </button>
            </div>
          );
        })}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {(SKILL_ACTIONS[selectedSkill] || []).map(action => {
            const isUnlocked = currentLevel >= action.levelReq;
            const workersDoingThis = activeWorkers.filter(w => w.activeTask?.actionId === action.id);
            const isDoing = workersDoingThis.length > 0;
            
            let missingInput = false;
            if (action.inputs) {
              for (const [id, qty] of Object.entries(action.inputs)) {
                if ((state.stash.items[id] || 0) < qty) missingInput = true;
              }
            }

            return (
              <div key={action.id} className={`relative bg-[#1A1512] rounded-lg border ${isDoing ? 'border-[#4EBA6F] shadow-[0_0_15px_rgba(78,186,111,0.2)]' : 'border-[#3D3328]'} p-4 flex flex-col gap-3 transition-colors ${!isUnlocked ? 'opacity-50 grayscale' : ''}`}>
                <div className="flex justify-between items-start">
                  <div className="font-bold text-[#F2E6A8] leading-tight pr-4">{action.name}</div>
                  <div className="text-xs font-bold text-[#D4A943] shrink-0 bg-[#2B231B] px-1.5 py-0.5 rounded border border-[#D4A943]/30">Lvl {action.levelReq}</div>
                </div>

                <div className="flex-1 flex flex-col gap-2 justify-center py-2">
                  <div className="flex items-center gap-2 justify-center text-sm">
                    {/* Inputs */}
                    {action.inputs ? (
                      <div className="space-y-1">
                        {Object.entries(action.inputs).map(([id, qty]) => {
                          const def = getDef(id, qty);
                          const hasEnough = (state.stash.items[id] || 0) >= qty;
                          return (
                            <div key={id} className={`flex items-center gap-1 ${hasEnough ? 'text-[#B8A890]' : 'text-[#E86E6E]'}`} title={`In stash: ${state.stash.items[id] || 0}`}>
                              <span>{def.qty}x</span>
                              <span className="text-base">{def.icon}</span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-xl opacity-50">👐</div>
                    )}
                    
                    <span className="text-[#3D3328] text-xl">➔</span>
                    
                    {/* Outputs */}
                    <div className="space-y-1">
                      {action.outputs && Object.entries(action.outputs).map(([id, qty]) => {
                        const def = getDef(id, qty);
                        return (
                          <div key={id} className="flex items-center gap-1 text-[#F2E6A8] font-bold">
                            <span>{def.qty}x</span>
                            <span className="text-xl drop-shadow-[0_0_4px_rgba(242,230,168,0.5)]">{def.icon}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] text-[#7A6E60] uppercase tracking-widest font-bold">
                  <span>{(action.duration / 1000).toFixed(1)}s</span>
                  <span className="text-[#7FE2A0]">+{action.xpReward} XP</span>
                </div>

                {isUnlocked && (
                  <button 
                    disabled={freeWorkers.length === 0 || missingInput}
                    onClick={() => setActiveTask(selectedSkill, action.id, action.duration)}
                    className={`mt-2 w-full py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors
                      ${freeWorkers.length === 0 
                        ? 'bg-[#1A1A1A] text-[#7A6E60] border border-[#3D3328] cursor-not-allowed' 
                        : missingInput 
                          ? 'bg-[#E86E6E15] text-[#E86E6E] border border-[#E86E6E]/20 cursor-not-allowed'
                          : 'bg-[#D4A943] text-[#14100C] hover:bg-[#F2E6A8]'}`
                    }
                  >
                    {freeWorkers.length === 0 ? 'No Free Workers' : missingInput ? 'Missing Materials' : 'Assign Worker'}
                  </button>
                )}
                {!isUnlocked && (
                  <div className="mt-2 w-full py-1.5 rounded text-xs font-bold uppercase tracking-wider text-center text-[#E86E6E]">
                    Requires Level {action.levelReq}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
