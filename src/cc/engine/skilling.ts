import { GameState, ActiveTask } from '../types';
import { ITEMS } from '../../constants';
import { pushLog } from './util';
import { addToStash, removeFromStash } from './loot';

// Define the available actions for each skill
export interface SkillActionDef {
  id: string;
  name: string;
  levelReq: number;
  duration: number; // base ms to complete
  xpReward: number;
  inputs?: Record<string, number>; // itemId -> qty required
  outputs?: Record<string, number>; // itemId -> qty gained
}

export const SKILL_ACTIONS: Record<string, SkillActionDef[]> = {
  mining: [
    { id: 'mine_copper', name: 'Mine Copper', levelReq: 1, duration: 4000, xpReward: 10, outputs: { copper_ore: 1 } },
    { id: 'mine_tin', name: 'Mine Tin', levelReq: 1, duration: 4000, xpReward: 10, outputs: { tin_ore: 1 } },
    { id: 'mine_iron', name: 'Mine Iron', levelReq: 15, duration: 6000, xpReward: 35, outputs: { iron_ore: 1 } },
    { id: 'mine_coal', name: 'Mine Coal', levelReq: 30, duration: 8000, xpReward: 50, outputs: { coal: 1 } },
    { id: 'mine_gold', name: 'Mine Gold', levelReq: 40, duration: 10000, xpReward: 65, outputs: { gold_ore: 1 } },
    { id: 'mine_mithril', name: 'Mine Mithril', levelReq: 50, duration: 12000, xpReward: 80, outputs: { mithril_ore: 1 } },
    { id: 'mine_adamant', name: 'Mine Adamant', levelReq: 70, duration: 15000, xpReward: 120, outputs: { adamant_ore: 1 } },
    { id: 'mine_runite', name: 'Mine Runite', levelReq: 85, duration: 25000, xpReward: 250, outputs: { runite_ore: 1 } },
  ],
  woodcutting: [
    { id: 'chop_logs', name: 'Chop Logs', levelReq: 1, duration: 4000, xpReward: 10, outputs: { logs: 1 } },
    { id: 'chop_oak', name: 'Chop Oak', levelReq: 15, duration: 6000, xpReward: 37, outputs: { oak_logs: 1 } },
    { id: 'chop_willow', name: 'Chop Willow', levelReq: 30, duration: 8000, xpReward: 67, outputs: { willow_logs: 1 } },
    { id: 'chop_maple', name: 'Chop Maple', levelReq: 45, duration: 10000, xpReward: 100, outputs: { maple_logs: 1 } },
    { id: 'chop_yew', name: 'Chop Yew', levelReq: 60, duration: 12000, xpReward: 175, outputs: { yew_logs: 1 } },
    { id: 'chop_magic', name: 'Chop Magic', levelReq: 75, duration: 15000, xpReward: 250, outputs: { magic_logs: 1 } },
  ],
  smithing: [
    { id: 'smelt_bronze', name: 'Smelt Bronze Bar', levelReq: 1, duration: 2500, xpReward: 6, inputs: { copper_ore: 1, tin_ore: 1 }, outputs: { bronze_bar: 1 } },
    { id: 'smith_bronze_sword', name: 'Smith Bronze Sword', levelReq: 1, duration: 5000, xpReward: 12, inputs: { bronze_bar: 1 }, outputs: { bronze_sword: 1 } },
    { id: 'smith_bronze_helm', name: 'Smith Bronze Helm', levelReq: 3, duration: 5500, xpReward: 16, inputs: { bronze_bar: 2 }, outputs: { bronze_helm: 1 } },
    { id: 'smith_bronze_platelegs', name: 'Smith Bronze Platelegs', levelReq: 8, duration: 6500, xpReward: 24, inputs: { bronze_bar: 3 }, outputs: { bronze_platelegs: 1 } },
    { id: 'smith_bronze_platebody', name: 'Smith Bronze Platebody', levelReq: 12, duration: 8000, xpReward: 32, inputs: { bronze_bar: 4 }, outputs: { bronze_platebody: 1 } },
    
    { id: 'smelt_iron', name: 'Smelt Iron Bar', levelReq: 15, duration: 3000, xpReward: 12, inputs: { iron_ore: 1 }, outputs: { iron_bar: 1 } },
    { id: 'smith_iron_sword', name: 'Smith Iron Sword', levelReq: 15, duration: 6000, xpReward: 25, inputs: { iron_bar: 1 }, outputs: { iron_sword: 1 } },
    { id: 'smith_iron_helm', name: 'Smith Iron Helm', levelReq: 20, duration: 8000, xpReward: 32, inputs: { iron_bar: 2 }, outputs: { iron_helm: 1 } },
    { id: 'smith_iron_platelegs', name: 'Smith Iron Platelegs', levelReq: 24, duration: 10000, xpReward: 48, inputs: { iron_bar: 3 }, outputs: { iron_platelegs: 1 } },
    { id: 'smith_iron_platebody', name: 'Smith Iron Platebody', levelReq: 28, duration: 12000, xpReward: 64, inputs: { iron_bar: 4 }, outputs: { iron_platebody: 1 } },

    { id: 'smelt_steel', name: 'Smelt Steel Bar', levelReq: 30, duration: 4000, xpReward: 17, inputs: { iron_ore: 1, coal: 2 }, outputs: { steel_bar: 1 } },
    { id: 'smith_steel_sword', name: 'Smith Steel Longsword', levelReq: 30, duration: 7000, xpReward: 37, inputs: { steel_bar: 2 }, outputs: { steel_longsword: 1 } },
    { id: 'smith_steel_helm', name: 'Smith Steel Helm', levelReq: 35, duration: 9000, xpReward: 42, inputs: { steel_bar: 2 }, outputs: { steel_helm: 1 } },
    { id: 'smith_steel_platelegs', name: 'Smith Steel Platelegs', levelReq: 40, duration: 12000, xpReward: 65, inputs: { steel_bar: 3 }, outputs: { steel_platelegs: 1 } },
    { id: 'smith_steel_platebody', name: 'Smith Steel Platebody', levelReq: 45, duration: 15000, xpReward: 90, inputs: { steel_bar: 4 }, outputs: { steel_platebody: 1 } },
    
    { id: 'smelt_gold', name: 'Smelt Gold Bar', levelReq: 40, duration: 4500, xpReward: 22, inputs: { gold_ore: 1 }, outputs: { gold_bar: 1 } },
    { id: 'smelt_mithril', name: 'Smelt Mithril Bar', levelReq: 50, duration: 5000, xpReward: 30, inputs: { mithril_ore: 1, coal: 4 }, outputs: { mithril_bar: 1 } },
    { id: 'smith_mithril_sword', name: 'Smith Mithril Longsword', levelReq: 50, duration: 8000, xpReward: 50, inputs: { mithril_bar: 2 }, outputs: { mithril_sword: 1 } },
    { id: 'smith_mithril_helm', name: 'Smith Mithril Helm', levelReq: 55, duration: 10000, xpReward: 60, inputs: { mithril_bar: 2 }, outputs: { mithril_helm: 1 } },
    { id: 'smith_mithril_platelegs', name: 'Smith Mithril Platelegs', levelReq: 60, duration: 14000, xpReward: 85, inputs: { mithril_bar: 3 }, outputs: { mithril_platelegs: 1 } },
    { id: 'smith_mithril_platebody', name: 'Smith Mithril Platebody', levelReq: 65, duration: 18000, xpReward: 110, inputs: { mithril_bar: 4 }, outputs: { mithril_platebody: 1 } },

    { id: 'smelt_adamant', name: 'Smelt Adamant Bar', levelReq: 70, duration: 6000, xpReward: 37, inputs: { adamant_ore: 1, coal: 6 }, outputs: { adamant_bar: 1 } },
    { id: 'smith_adamant_sword', name: 'Smith Adamant Longsword', levelReq: 70, duration: 9000, xpReward: 65, inputs: { adamant_bar: 2 }, outputs: { adamant_sword: 1 } },
    { id: 'smith_adamant_helm', name: 'Smith Adamant Helm', levelReq: 75, duration: 12000, xpReward: 75, inputs: { adamant_bar: 2 }, outputs: { adamant_helm: 1 } },
    { id: 'smith_adamant_platelegs', name: 'Smith Adamant Platelegs', levelReq: 80, duration: 16000, xpReward: 105, inputs: { adamant_bar: 3 }, outputs: { adamant_platelegs: 1 } },
    { id: 'smith_adamant_platebody', name: 'Smith Adamant Platebody', levelReq: 84, duration: 21000, xpReward: 140, inputs: { adamant_bar: 4 }, outputs: { adamant_platebody: 1 } },

    { id: 'smelt_runite', name: 'Smelt Runite Bar', levelReq: 85, duration: 8000, xpReward: 50, inputs: { runite_ore: 1, coal: 8 }, outputs: { runite_bar: 1 } },
    { id: 'smith_runite_sword', name: 'Smith Runite Longsword', levelReq: 85, duration: 12000, xpReward: 85, inputs: { runite_bar: 2 }, outputs: { runite_sword: 1 } },
    { id: 'smith_runite_helm', name: 'Smith Runite Helm', levelReq: 88, duration: 15000, xpReward: 100, inputs: { runite_bar: 2 }, outputs: { runite_helm: 1 } },
    { id: 'smith_runite_platelegs', name: 'Smith Runite Platelegs', levelReq: 92, duration: 20000, xpReward: 140, inputs: { runite_bar: 3 }, outputs: { runite_platelegs: 1 } },
    { id: 'smith_runite_platebody', name: 'Smith Runite Platebody', levelReq: 99, duration: 28000, xpReward: 200, inputs: { runite_bar: 4 }, outputs: { runite_platebody: 1 } },
  ],
  herblore: [
    { id: 'mix_attack_pot', name: 'Mix Attack Potion', levelReq: 1, duration: 2000, xpReward: 25, inputs: { herbs: 1, vial_of_water: 1 }, outputs: { attack_potion: 1 } },
    { id: 'mix_health_pot', name: 'Mix Minor Health Potion', levelReq: 10, duration: 3000, xpReward: 40, inputs: { herbs: 2, vial_of_water: 1 }, outputs: { healing_potion: 1 } },
    { id: 'mix_mana_pot', name: 'Mix Minor Mana Potion', levelReq: 15, duration: 3000, xpReward: 50, inputs: { herbs: 2, vial_of_water: 1, glowing_mushroom: 1 }, outputs: { mana_potion: 1 } },
  ],
  crafting: [
    { id: 'craft_leather_vest', name: 'Craft Leather Vest', levelReq: 1, duration: 4500, xpReward: 20, inputs: { goblin_ear: 2, spider_silk: 1 }, outputs: { leather_vest: 1 } },
    { id: 'craft_cloth_robe', name: 'Craft Cloth Robe', levelReq: 5, duration: 4000, xpReward: 25, inputs: { spider_silk: 3 }, outputs: { cloth_robe: 1 } },
    { id: 'fletch_short_bow', name: 'Fletch Short Bow', levelReq: 10, duration: 5000, xpReward: 35, inputs: { logs: 2, spider_silk: 1 }, outputs: { short_bow: 1 } },
    { id: 'craft_oak_staff', name: 'Craft Oak Staff', levelReq: 15, duration: 6000, xpReward: 45, inputs: { oak_logs: 2, bone_shard: 1 }, outputs: { oak_staff: 1 } },
    { id: 'fletch_elven_bow', name: 'Fletch Elven Bow', levelReq: 30, duration: 7500, xpReward: 75, inputs: { willow_logs: 2, spider_silk: 2 }, outputs: { elven_bow: 1 } },
    { id: 'craft_crystal_staff', name: 'Craft Crystal Staff', levelReq: 35, duration: 8000, xpReward: 85, inputs: { maple_logs: 2, ice_shard: 1 }, outputs: { crystal_staff: 1 } },
    { id: 'fletch_yew_longbow', name: 'Fletch Yew Longbow', levelReq: 40, duration: 8000, xpReward: 90, inputs: { yew_logs: 2, spider_silk: 2 }, outputs: { yew_longbow: 1 } },
    { id: 'craft_archon_staff', name: 'Craft Archon Staff', levelReq: 60, duration: 12000, xpReward: 160, inputs: { magic_logs: 2, demon_horn: 2 }, outputs: { archon_staff: 1 } },
  ],
  fishing: [
    { id: 'net_shrimp', name: 'Net Shrimp', levelReq: 1, duration: 4000, xpReward: 10, outputs: { raw_shrimp: 1 } },
    { id: 'bait_sardine', name: 'Bait Sardine', levelReq: 5, duration: 5000, xpReward: 20, outputs: { raw_sardine: 1 } },
    { id: 'flyfish_trout', name: 'Flyfish Trout', levelReq: 20, duration: 6000, xpReward: 50, outputs: { raw_trout: 1 } },
    { id: 'flyfish_salmon', name: 'Flyfish Salmon', levelReq: 30, duration: 6500, xpReward: 70, outputs: { raw_salmon: 1 } },
    { id: 'cage_lobster', name: 'Cage Lobster', levelReq: 40, duration: 8000, xpReward: 90, outputs: { raw_lobster: 1 } },
    { id: 'harpoon_swordfish', name: 'Harpoon Swordfish', levelReq: 50, duration: 10000, xpReward: 100, outputs: { raw_swordfish: 1 } },
    { id: 'harpoon_shark', name: 'Harpoon Shark', levelReq: 76, duration: 15000, xpReward: 110, outputs: { raw_shark: 1 } },
    { id: 'net_manta_ray', name: 'Net Manta Ray', levelReq: 81, duration: 20000, xpReward: 120, outputs: { raw_manta_ray: 1 } },
  ],
  cooking: [
    { id: 'cook_shrimp', name: 'Cook Shrimp', levelReq: 1, duration: 2500, xpReward: 30, inputs: { raw_shrimp: 1 }, outputs: { cooked_shrimp: 1 } },
    { id: 'cook_sardine', name: 'Cook Sardine', levelReq: 1, duration: 2500, xpReward: 40, inputs: { raw_sardine: 1 }, outputs: { cooked_sardine: 1 } },
    { id: 'cook_trout', name: 'Cook Trout', levelReq: 15, duration: 3000, xpReward: 70, inputs: { raw_trout: 1 }, outputs: { cooked_trout: 1 } },
    { id: 'cook_salmon', name: 'Cook Salmon', levelReq: 25, duration: 3000, xpReward: 90, inputs: { raw_salmon: 1 }, outputs: { cooked_salmon: 1 } },
    { id: 'cook_lobster', name: 'Cook Lobster', levelReq: 40, duration: 4000, xpReward: 120, inputs: { raw_lobster: 1 }, outputs: { cooked_lobster: 1 } },
    { id: 'cook_swordfish', name: 'Cook Swordfish', levelReq: 45, duration: 4500, xpReward: 140, inputs: { raw_swordfish: 1 }, outputs: { cooked_swordfish: 1 } },
    { id: 'cook_shark', name: 'Cook Shark', levelReq: 80, duration: 5000, xpReward: 210, inputs: { raw_shark: 1 }, outputs: { cooked_shark: 1 } },
    { id: 'cook_manta_ray', name: 'Cook Manta Ray', levelReq: 91, duration: 6000, xpReward: 216, inputs: { raw_manta_ray: 1 }, outputs: { cooked_manta_ray: 1 } },
  ],
};

function hasRequiredInputs(state: GameState, inputs?: Record<string, number>): boolean {
  if (!inputs) return true;
  for (const [itemId, qty] of Object.entries(inputs)) {
    if ((state.stash.items[itemId] || 0) < qty) {
      return false;
    }
  }
  return true;
}

export function tickSkilling(state: GameState, dt: number) {
  if (!state.town || !state.town.workers) return;

  for (const worker of state.town.workers) {
    if (!worker.activeTask) continue;
    const task = worker.activeTask;

    const defs = SKILL_ACTIONS[task.skillId] || [];
    const actionDef = defs.find(d => d.id === task.actionId);

    if (!actionDef) {
      worker.activeTask = undefined;
      continue;
    }

    // Quick check for inputs before progressing (in case they dropped it or ran out)
    if (!hasRequiredInputs(state, actionDef.inputs)) {
      // Cannot proceed, pause progressing or cancel? Cancel task so they know it stopped.
      pushLog(state, 'system', `${worker.name} ran out of materials for ${actionDef.name}. Task stopped.`);
      worker.activeTask = undefined;
      continue;
    }

    task.progress += dt;
    if (task.progress >= task.duration) {
      // Complete action
      task.progress -= task.duration; // keep leftover dt

      // Consume inputs
      if (actionDef.inputs) {
        for (const [id, qty] of Object.entries(actionDef.inputs)) {
          removeFromStash(state, id, qty);
        }
      }

      // Grant outputs
      if (actionDef.outputs) {
        for (const [id, qty] of Object.entries(actionDef.outputs)) {
          addToStash(state, id, qty);
        }
      }

      // Grant XP
      if (!state.skills[task.skillId]) {
        state.skills[task.skillId] = { level: 1, xp: 0 };
      }
      const skillState = state.skills[task.skillId]!;
      skillState.xp += actionDef.xpReward;
      
      // Check level up (using a simple cubic formula typical for OSRS style)
      let nextLevelXp = Math.floor(0.25 * Math.pow(skillState.level + 1, 3) * 50);
      // Add a fallback so lvl 1 isnt too hard
      if (skillState.level === 1) nextLevelXp = 83;
      
      while (skillState.xp >= nextLevelXp && skillState.level < 99) {
        skillState.level++;
        nextLevelXp = Math.floor(0.25 * Math.pow(skillState.level + 1, 3) * 50);
        pushLog(state, 'level', `Your ${task.skillId} level has reached ${skillState.level}!`);
      }

      // Re-check inputs for the *next* cycle
      if (!hasRequiredInputs(state, actionDef.inputs)) {
         pushLog(state, 'system', `${worker.name} ran out of materials for ${actionDef.name} after a successful craft.`);
         worker.activeTask = undefined;
      }
    }
  }
}
