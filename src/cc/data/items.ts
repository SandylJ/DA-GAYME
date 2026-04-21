import { Item } from '../types';

function mk(partial: Item): Item { return partial; }

export const ITEMS: Record<string, Item> = {
  // ========== CURRENCIES / MATERIALS (tradable loot) ==========
  gold_nugget: mk({ id: 'gold_nugget', name: 'Gold Nugget', icon: '🪙', rarity: 'common', type: 'currency', value: 5 }),
  bone_shard: mk({ id: 'bone_shard', name: 'Bone Shard', icon: '🦴', rarity: 'common', type: 'material', value: 3 }),
  slime_gel: mk({ id: 'slime_gel', name: 'Slime Gel', icon: '🟢', rarity: 'common', type: 'material', value: 2 }),
  goblin_ear: mk({ id: 'goblin_ear', name: 'Goblin Ear', icon: '👂', rarity: 'common', type: 'material', value: 4 }),
  spider_silk: mk({ id: 'spider_silk', name: 'Spider Silk', icon: '🕸️', rarity: 'uncommon', type: 'material', value: 12 }),
  ice_shard: mk({ id: 'ice_shard', name: 'Ice Shard', icon: '🔹', rarity: 'uncommon', type: 'material', value: 18 }),
  demon_horn: mk({ id: 'demon_horn', name: 'Demon Horn', icon: '🐃', rarity: 'rare', type: 'material', value: 60 }),
  dragon_scale: mk({ id: 'dragon_scale', name: 'Dragon Scale', icon: '🐲', rarity: 'epic', type: 'material', value: 200 }),
  celestial_dust: mk({ id: 'celestial_dust', name: 'Celestial Dust', icon: '✨', rarity: 'legendary', type: 'material', value: 800 }),

  // ========== SKILLING MATERIALS ==========
  copper_ore: mk({ id: 'copper_ore', name: 'Copper Ore', icon: '🪨', rarity: 'common', type: 'material', value: 5 }),
  tin_ore: mk({ id: 'tin_ore', name: 'Tin Ore', icon: '🪨', rarity: 'common', type: 'material', value: 5 }),
  iron_ore: mk({ id: 'iron_ore', name: 'Iron Ore', icon: '🪨', rarity: 'uncommon', type: 'material', value: 15 }),
  coal: mk({ id: 'coal', name: 'Coal', icon: '🌑', rarity: 'uncommon', type: 'material', value: 20 }),
  gold_ore: mk({ id: 'gold_ore', name: 'Gold Ore', icon: '🟡', rarity: 'rare', type: 'material', value: 60 }),
  mithril_ore: mk({ id: 'mithril_ore', name: 'Mithril Ore', icon: '🔵', rarity: 'epic', type: 'material', value: 200 }),
  adamant_ore: mk({ id: 'adamant_ore', name: 'Adamant Ore', icon: '🟢', rarity: 'legendary', type: 'material', value: 500 }),
  runite_ore: mk({ id: 'runite_ore', name: 'Runite Ore', icon: '🧿', rarity: 'celestial', type: 'material', value: 2000 }),
  
  bronze_bar: mk({ id: 'bronze_bar', name: 'Bronze Bar', icon: '🧱', rarity: 'common', type: 'material', value: 15 }),
  iron_bar: mk({ id: 'iron_bar', name: 'Iron Bar', icon: '🧱', rarity: 'uncommon', type: 'material', value: 45 }),
  steel_bar: mk({ id: 'steel_bar', name: 'Steel Bar', icon: '🧱', rarity: 'rare', type: 'material', value: 120 }),
  gold_bar: mk({ id: 'gold_bar', name: 'Gold Bar', icon: '🟡', rarity: 'rare', type: 'material', value: 250 }),
  mithril_bar: mk({ id: 'mithril_bar', name: 'Mithril Bar', icon: '🔵', rarity: 'epic', type: 'material', value: 600 }),
  adamant_bar: mk({ id: 'adamant_bar', name: 'Adamant Bar', icon: '🟢', rarity: 'legendary', type: 'material', value: 1500 }),
  runite_bar: mk({ id: 'runite_bar', name: 'Runite Bar', icon: '🧿', rarity: 'celestial', type: 'material', value: 5000 }),
  
  logs: mk({ id: 'logs', name: 'Logs', icon: '🪵', rarity: 'common', type: 'material', value: 5 }),
  oak_logs: mk({ id: 'oak_logs', name: 'Oak Logs', icon: '🪵', rarity: 'uncommon', type: 'material', value: 15 }),
  willow_logs: mk({ id: 'willow_logs', name: 'Willow Logs', icon: '🪵', rarity: 'uncommon', type: 'material', value: 30 }),
  maple_logs: mk({ id: 'maple_logs', name: 'Maple Logs', icon: '🪵', rarity: 'rare', type: 'material', value: 60 }),
  yew_logs: mk({ id: 'yew_logs', name: 'Yew Logs', icon: '🪵', rarity: 'epic', type: 'material', value: 150 }),
  magic_logs: mk({ id: 'magic_logs', name: 'Magic Logs', icon: '✨', rarity: 'legendary', type: 'material', value: 400 }),

  herbs: mk({ id: 'herbs', name: 'Herbs', icon: '🌿', rarity: 'common', type: 'material', value: 10 }),
  marrentill: mk({ id: 'marrentill', name: 'Marrentill', icon: '🌿', rarity: 'uncommon', type: 'material', value: 25 }),
  tarromin: mk({ id: 'tarromin', name: 'Tarromin', icon: '🌿', rarity: 'uncommon', type: 'material', value: 50 }),
  ranarr: mk({ id: 'ranarr', name: 'Ranarr Weed', icon: '🌿', rarity: 'rare', type: 'material', value: 200 }),
  toadflax: mk({ id: 'toadflax', name: 'Toadflax', icon: '🌿', rarity: 'rare', type: 'material', value: 300 }),
  snapdragon: mk({ id: 'snapdragon', name: 'Snapdragon', icon: '🌿', rarity: 'epic', type: 'material', value: 800 }),
  torstol: mk({ id: 'torstol', name: 'Torstol', icon: '🌿', rarity: 'legendary', type: 'material', value: 2000 }),

  vial_of_water: mk({ id: 'vial_of_water', name: 'Vial of Water', icon: '🧪', rarity: 'common', type: 'material', value: 5 }),
  glowing_mushroom: mk({ id: 'glowing_mushroom', name: 'Glowing Mushroom', icon: '🍄', rarity: 'uncommon', type: 'material', value: 20 }),

  raw_shrimp: mk({ id: 'raw_shrimp', name: 'Raw Shrimp', icon: '🦐', rarity: 'common', type: 'material', value: 5 }),
  cooked_shrimp: mk({ id: 'cooked_shrimp', name: 'Cooked Shrimp', icon: '🍤', rarity: 'common', type: 'consumable', value: 10, healOnUse: 20, description: 'Restores 20 HP.' }),
  raw_sardine: mk({ id: 'raw_sardine', name: 'Raw Sardine', icon: '🐟', rarity: 'common', type: 'material', value: 8 }),
  cooked_sardine: mk({ id: 'cooked_sardine', name: 'Cooked Sardine', icon: '🍣', rarity: 'common', type: 'consumable', value: 20, healOnUse: 35, description: 'Restores 35 HP.' }),
  raw_trout: mk({ id: 'raw_trout', name: 'Raw Trout', icon: '🐟', rarity: 'uncommon', type: 'material', value: 20 }),
  cooked_trout: mk({ id: 'cooked_trout', name: 'Cooked Trout', icon: '🍣', rarity: 'uncommon', type: 'consumable', value: 45, healOnUse: 80, description: 'Restores 80 HP.' }),
  raw_salmon: mk({ id: 'raw_salmon', name: 'Raw Salmon', icon: '🐟', rarity: 'uncommon', type: 'material', value: 40 }),
  cooked_salmon: mk({ id: 'cooked_salmon', name: 'Cooked Salmon', icon: '🍣', rarity: 'uncommon', type: 'consumable', value: 90, healOnUse: 120, description: 'Restores 120 HP.' }),
  raw_lobster: mk({ id: 'raw_lobster', name: 'Raw Lobster', icon: '🦞', rarity: 'rare', type: 'material', value: 60 }),
  cooked_lobster: mk({ id: 'cooked_lobster', name: 'Cooked Lobster', icon: '🦞', rarity: 'rare', type: 'consumable', value: 120, healOnUse: 200, description: 'Restores 200 HP.' }),
  raw_swordfish: mk({ id: 'raw_swordfish', name: 'Raw Swordfish', icon: '🐟', rarity: 'rare', type: 'material', value: 120 }),
  cooked_swordfish: mk({ id: 'cooked_swordfish', name: 'Cooked Swordfish', icon: '🐟', rarity: 'rare', type: 'consumable', value: 250, healOnUse: 350, description: 'Restores 350 HP.' }),
  raw_shark: mk({ id: 'raw_shark', name: 'Raw Shark', icon: '🦈', rarity: 'legendary', type: 'material', value: 250 }),
  cooked_shark: mk({ id: 'cooked_shark', name: 'Cooked Shark', icon: '🦈', rarity: 'legendary', type: 'consumable', value: 500, healOnUse: 500, description: 'Restores 500 HP.' }),
  raw_manta_ray: mk({ id: 'raw_manta_ray', name: 'Raw Manta Ray', icon: '🐠', rarity: 'celestial', type: 'material', value: 800 }),
  cooked_manta_ray: mk({ id: 'cooked_manta_ray', name: 'Cooked Manta Ray', icon: '🐠', rarity: 'celestial', type: 'consumable', value: 1800, healOnUse: 800, description: 'Restores 800 HP.' }),

  bronze_sword: mk({ id: 'bronze_sword', name: 'Bronze Sword', icon: '⚔️', rarity: 'common', type: 'weapon', slot: 'weapon', weaponPower: 4, stats: { str: 1 }, value: 25 }),
  steel_sword: mk({ id: 'steel_sword', name: 'Steel Sword', icon: '⚔️', rarity: 'rare', type: 'weapon', slot: 'weapon', weaponPower: 18, stats: { str: 5, con: 2 }, value: 500 }),
  attack_potion: mk({ id: 'attack_potion', name: 'Attack Potion', icon: '🧪', rarity: 'uncommon', type: 'potion', value: 100, description: 'Consumable buff.' }),

  // ========== POTIONS ==========
  healing_potion: mk({ id: 'healing_potion', name: 'Healing Potion', icon: '🧪', rarity: 'common', type: 'potion', value: 25, healOnUse: 40, description: 'Restores 40 HP.' }),
  greater_healing_potion: mk({ id: 'greater_healing_potion', name: 'Greater Healing Potion', icon: '🧴', rarity: 'uncommon', type: 'potion', value: 75, healOnUse: 150, description: 'Restores 150 HP.' }),
  mana_potion: mk({ id: 'mana_potion', name: 'Mana Potion', icon: '💧', rarity: 'common', type: 'potion', value: 30, manaOnUse: 30, description: 'Restores 30 MP.' }),
  elixir_of_life: mk({ id: 'elixir_of_life', name: 'Elixir of Life', icon: '🍷', rarity: 'rare', type: 'potion', value: 300, healOnUse: 999, manaOnUse: 999, description: 'Full HP and MP.' }),

  // ========== WEAPONS ==========
  rusty_sword: mk({ id: 'rusty_sword', name: 'Rusty Sword', icon: '⚔️', rarity: 'common', type: 'weapon', slot: 'weapon', weaponPower: 3, stats: { str: 1 }, value: 8 }),
  iron_sword: mk({ id: 'iron_sword', name: 'Iron Sword', icon: '🗡️', rarity: 'common', type: 'weapon', slot: 'weapon', weaponPower: 6, stats: { str: 2 }, value: 35 }),
  steel_longsword: mk({ id: 'steel_longsword', name: 'Steel Longsword', icon: '⚔️', rarity: 'uncommon', type: 'weapon', slot: 'weapon', weaponPower: 12, stats: { str: 4 }, value: 150 }),
  knight_blade: mk({ id: 'knight_blade', name: "Knight's Blade", icon: '🗡️', rarity: 'rare', type: 'weapon', slot: 'weapon', weaponPower: 24, stats: { str: 8, con: 3 }, value: 600, levelReq: 8 }),
  mithril_sword: mk({ id: 'mithril_sword', name: 'Mithril Longsword', icon: '⚔️', rarity: 'epic', type: 'weapon', slot: 'weapon', weaponPower: 30, stats: { str: 10, con: 5 }, value: 1000, levelReq: 20 }),
  adamant_sword: mk({ id: 'adamant_sword', name: 'Adamant Longsword', icon: '⚔️', rarity: 'legendary', type: 'weapon', slot: 'weapon', weaponPower: 45, stats: { str: 16, con: 8 }, value: 2500, levelReq: 30 }),
  runite_sword: mk({ id: 'runite_sword', name: 'Runite Longsword', icon: '🧿', rarity: 'celestial', type: 'weapon', slot: 'weapon', weaponPower: 65, stats: { str: 24, con: 12 }, value: 8000, levelReq: 40 }),
  holy_avenger: mk({ id: 'holy_avenger', name: 'Holy Avenger', icon: '🗡️', rarity: 'epic', type: 'weapon', slot: 'weapon', weaponPower: 42, stats: { str: 14, con: 6, luck: 4 }, value: 2500, levelReq: 18 }),
  dragonbone_sword: mk({ id: 'dragonbone_sword', name: 'Dragonbone Sword', icon: '⚔️', rarity: 'legendary', type: 'weapon', slot: 'weapon', weaponPower: 80, stats: { str: 25, con: 10, luck: 8 }, value: 10000, levelReq: 35 }),

  oak_staff: mk({ id: 'oak_staff', name: 'Oak Staff', icon: '🪄', rarity: 'common', type: 'weapon', slot: 'weapon', weaponPower: 2, stats: { int: 3 }, value: 30, classReq: ['mage', 'priest'] }),
  crystal_staff: mk({ id: 'crystal_staff', name: 'Crystal Staff', icon: '🔮', rarity: 'uncommon', type: 'weapon', slot: 'weapon', weaponPower: 5, stats: { int: 8, dex: 2 }, value: 180, classReq: ['mage', 'priest'] }),
  archon_staff: mk({ id: 'archon_staff', name: 'Archon Staff', icon: '🪄', rarity: 'epic', type: 'weapon', slot: 'weapon', weaponPower: 18, stats: { int: 22, luck: 5 }, value: 3200, levelReq: 18, classReq: ['mage', 'priest'] }),

  short_bow: mk({ id: 'short_bow', name: 'Short Bow', icon: '🏹', rarity: 'common', type: 'weapon', slot: 'weapon', weaponPower: 4, stats: { dex: 2 }, value: 40, classReq: ['ranger'] }),
  yew_longbow: mk({ id: 'yew_longbow', name: 'Yew Longbow', icon: '🏹', rarity: 'uncommon', type: 'weapon', slot: 'weapon', weaponPower: 10, stats: { dex: 6 }, value: 220, classReq: ['ranger'] }),
  elven_bow: mk({ id: 'elven_bow', name: 'Elven Bow', icon: '🏹', rarity: 'rare', type: 'weapon', slot: 'weapon', weaponPower: 22, stats: { dex: 12, spd: 4 }, value: 900, levelReq: 10, classReq: ['ranger'] }),

  iron_dagger: mk({ id: 'iron_dagger', name: 'Iron Dagger', icon: '🗡️', rarity: 'common', type: 'weapon', slot: 'weapon', weaponPower: 3, stats: { dex: 3, spd: 1 }, value: 20, classReq: ['rogue'] }),
  poisoned_dagger: mk({ id: 'poisoned_dagger', name: 'Poisoned Dagger', icon: '🗡️', rarity: 'uncommon', type: 'weapon', slot: 'weapon', weaponPower: 8, stats: { dex: 6, luck: 3 }, value: 180, classReq: ['rogue'] }),
  shadowfang: mk({ id: 'shadowfang', name: 'Shadowfang', icon: '🗡️', rarity: 'rare', type: 'weapon', slot: 'weapon', weaponPower: 18, stats: { dex: 12, spd: 5, luck: 6 }, value: 850, levelReq: 10, classReq: ['rogue'] }),

  woodcutter_axe: mk({ id: 'woodcutter_axe', name: "Woodcutter's Axe", icon: '🪓', rarity: 'common', type: 'weapon', slot: 'weapon', weaponPower: 5, stats: { str: 2 }, value: 25, classReq: ['barbarian'] }),
  warhammer: mk({ id: 'warhammer', name: 'Warhammer', icon: '🔨', rarity: 'uncommon', type: 'weapon', slot: 'weapon', weaponPower: 14, stats: { str: 6, con: 2 }, value: 200, classReq: ['barbarian', 'knight'] }),
  crimson_greataxe: mk({ id: 'crimson_greataxe', name: 'Crimson Greataxe', icon: '🪓', rarity: 'rare', type: 'weapon', slot: 'weapon', weaponPower: 28, stats: { str: 14, luck: 4 }, value: 1100, levelReq: 10, classReq: ['barbarian'] }),

  // ========== ARMOR ==========
  cloth_robe: mk({ id: 'cloth_robe', name: 'Cloth Robe', icon: '🥼', rarity: 'common', type: 'armor', slot: 'body', armor: 2, stats: { int: 1 }, value: 15 }),
  leather_vest: mk({ id: 'leather_vest', name: 'Leather Vest', icon: '🦺', rarity: 'common', type: 'armor', slot: 'body', armor: 4, stats: { dex: 1, con: 1 }, value: 30 }),
  chain_hauberk: mk({ id: 'chain_hauberk', name: 'Chain Hauberk', icon: '👕', rarity: 'uncommon', type: 'armor', slot: 'body', armor: 10, stats: { con: 4 }, value: 140 }),
  
  // Bronze Set
  bronze_helm: mk({ id: 'bronze_helm', name: 'Bronze Helm', icon: '⛑️', rarity: 'common', type: 'armor', slot: 'head', armor: 3, stats: { con: 1 }, value: 45 }),
  bronze_platebody: mk({ id: 'bronze_platebody', name: 'Bronze Platebody', icon: '👕', rarity: 'common', type: 'armor', slot: 'body', armor: 8, stats: { con: 2 }, value: 65 }),
  bronze_platelegs: mk({ id: 'bronze_platelegs', name: 'Bronze Platelegs', icon: '👖', rarity: 'common', type: 'armor', slot: 'legs', armor: 5, stats: { con: 1 }, value: 55 }),
  // Iron Set
  iron_helm: mk({ id: 'iron_helm', name: 'Iron Helm', icon: '⛑️', rarity: 'uncommon', type: 'armor', slot: 'head', armor: 6, stats: { con: 2 }, value: 90 }),
  iron_platebody: mk({ id: 'iron_platebody', name: 'Iron Platebody', icon: '👕', rarity: 'uncommon', type: 'armor', slot: 'body', armor: 14, stats: { con: 4, str: 1 }, value: 150 }),
  iron_platelegs: mk({ id: 'iron_platelegs', name: 'Iron Platelegs', icon: '👖', rarity: 'uncommon', type: 'armor', slot: 'legs', armor: 9, stats: { con: 3 }, value: 120 }),
  // Steel Set
  steel_helm: mk({ id: 'steel_helm', name: 'Steel Helm', icon: '⛑️', rarity: 'rare', type: 'armor', slot: 'head', armor: 10, stats: { con: 4 }, value: 200, levelReq: 10 }),
  steel_platebody: mk({ id: 'steel_platebody', name: 'Steel Platebody', icon: '👕', rarity: 'rare', type: 'armor', slot: 'body', armor: 22, stats: { con: 8, str: 3 }, value: 350, levelReq: 10 }),
  steel_platelegs: mk({ id: 'steel_platelegs', name: 'Steel Platelegs', icon: '👖', rarity: 'rare', type: 'armor', slot: 'legs', armor: 15, stats: { con: 6 }, value: 280, levelReq: 10 }),
  // Mithril Set
  mithril_helm: mk({ id: 'mithril_helm', name: 'Mithril Helm', icon: '⛑️', rarity: 'epic', type: 'armor', slot: 'head', armor: 15, stats: { con: 8 }, value: 500, levelReq: 20 }),
  mithril_platebody: mk({ id: 'mithril_platebody', name: 'Mithril Platebody', icon: '👕', rarity: 'epic', type: 'armor', slot: 'body', armor: 32, stats: { con: 14, str: 5 }, value: 1200, levelReq: 20 }),
  mithril_platelegs: mk({ id: 'mithril_platelegs', name: 'Mithril Platelegs', icon: '👖', rarity: 'epic', type: 'armor', slot: 'legs', armor: 22, stats: { con: 10 }, value: 900, levelReq: 20 }),
  // Adamant Set
  adamant_helm: mk({ id: 'adamant_helm', name: 'Adamant Helm', icon: '⛑️', rarity: 'legendary', type: 'armor', slot: 'head', armor: 24, stats: { con: 14 }, value: 1200, levelReq: 30 }),
  adamant_platebody: mk({ id: 'adamant_platebody', name: 'Adamant Platebody', icon: '👕', rarity: 'legendary', type: 'armor', slot: 'body', armor: 45, stats: { con: 22, str: 8 }, value: 3000, levelReq: 30 }),
  adamant_platelegs: mk({ id: 'adamant_platelegs', name: 'Adamant Platelegs', icon: '👖', rarity: 'legendary', type: 'armor', slot: 'legs', armor: 30, stats: { con: 16 }, value: 2200, levelReq: 30 }),
  // Runite Set
  runite_helm: mk({ id: 'runite_helm', name: 'Runite Helm', icon: '🧿', rarity: 'celestial', type: 'armor', slot: 'head', armor: 35, stats: { con: 20 }, value: 4000, levelReq: 40 }),
  runite_platebody: mk({ id: 'runite_platebody', name: 'Runite Platebody', icon: '👕', rarity: 'celestial', type: 'armor', slot: 'body', armor: 70, stats: { con: 35, str: 15 }, value: 10000, levelReq: 40 }),
  runite_platelegs: mk({ id: 'runite_platelegs', name: 'Runite Platelegs', icon: '👖', rarity: 'celestial', type: 'armor', slot: 'legs', armor: 45, stats: { con: 25 }, value: 7500, levelReq: 40 }),

  plate_armor: mk({ id: 'plate_armor', name: 'Plate Armor', icon: '🛡️', rarity: 'rare', type: 'armor', slot: 'body', armor: 24, stats: { con: 10, str: 3 }, value: 700, levelReq: 10 }),
  dragonplate: mk({ id: 'dragonplate', name: 'Dragonplate', icon: '🛡️', rarity: 'legendary', type: 'armor', slot: 'body', armor: 60, stats: { con: 24, str: 8, luck: 6 }, value: 8500, levelReq: 30 }),

  leather_cap: mk({ id: 'leather_cap', name: 'Leather Cap', icon: '🎩', rarity: 'common', type: 'armor', slot: 'head', armor: 2, value: 18 }),
  crown_of_valor: mk({ id: 'crown_of_valor', name: 'Crown of Valor', icon: '👑', rarity: 'epic', type: 'armor', slot: 'head', armor: 14, stats: { con: 8, luck: 4 }, value: 1800, levelReq: 20 }),

  leather_boots: mk({ id: 'leather_boots', name: 'Leather Boots', icon: '🥾', rarity: 'common', type: 'armor', slot: 'feet', armor: 1, stats: { spd: 1 }, value: 12 }),
  swift_boots: mk({ id: 'swift_boots', name: 'Swift Boots', icon: '🥾', rarity: 'rare', type: 'armor', slot: 'feet', armor: 3, stats: { spd: 5, dex: 3 }, value: 450, levelReq: 8 }),

  wooden_shield: mk({ id: 'wooden_shield', name: 'Wooden Shield', icon: '🛡️', rarity: 'common', type: 'armor', slot: 'offhand', armor: 3, stats: { con: 1 }, value: 18, classReq: ['knight'] }),
  kite_shield: mk({ id: 'kite_shield', name: 'Kite Shield', icon: '🛡️', rarity: 'uncommon', type: 'armor', slot: 'offhand', armor: 8, stats: { con: 3 }, value: 110, classReq: ['knight'] }),
  bulwark_shield: mk({ id: 'bulwark_shield', name: 'Bulwark Shield', icon: '🛡️', rarity: 'epic', type: 'armor', slot: 'offhand', armor: 20, stats: { con: 10, str: 4 }, value: 2100, levelReq: 18, classReq: ['knight'] }),

  // ========== SCROLLS (consumables with party-wide effects) ==========
  scroll_town_portal: mk({ id: 'scroll_town_portal', name: 'Scroll of Town Portal', icon: '🌀', rarity: 'uncommon', type: 'consumable', value: 120, description: 'Instantly retreat to town from inside a dungeon.' }),
  scroll_identify:    mk({ id: 'scroll_identify', name: 'Scroll of Identify', icon: '📜', rarity: 'uncommon', type: 'consumable', value: 60, description: 'Reveals 2 random unrevealed tiles in the current dungeon.' }),
  scroll_xp:          mk({ id: 'scroll_xp', name: 'Scroll of Insight', icon: '📖', rarity: 'rare', type: 'consumable', value: 250, description: 'Grants the active party 500 XP each.' }),
  scroll_bless:       mk({ id: 'scroll_bless', name: 'Scroll of Blessing', icon: '📃', rarity: 'rare', type: 'consumable', value: 300, description: 'Buffs all party stats +25% for 60s.' }),
  scroll_haste:       mk({ id: 'scroll_haste', name: 'Scroll of Haste', icon: '⚡', rarity: 'rare', type: 'consumable', value: 220, description: 'Double movement + attack speed for 45s.' }),

  // ========== POTION BUNDLES (virtual — purchased only) ==========
  // The shop "bundle" buttons don't need a real item row; see bundle code in Town.

  // ========== TRINKETS ==========
  lucky_charm: mk({ id: 'lucky_charm', name: 'Lucky Charm', icon: '🍀', rarity: 'uncommon', type: 'trinket', slot: 'neck', stats: { luck: 4 }, value: 120 }),
  ring_of_power: mk({ id: 'ring_of_power', name: 'Ring of Power', icon: '💍', rarity: 'rare', type: 'trinket', slot: 'ring', stats: { str: 4, int: 4 }, value: 500 }),
  amulet_of_vigor: mk({ id: 'amulet_of_vigor', name: 'Amulet of Vigor', icon: '📿', rarity: 'epic', type: 'trinket', slot: 'neck', stats: { con: 12, luck: 3 }, value: 1800, levelReq: 15 }),
  celestial_band: mk({ id: 'celestial_band', name: 'Celestial Band', icon: '💎', rarity: 'celestial', type: 'trinket', slot: 'ring', stats: { str: 10, dex: 10, int: 10, con: 10, spd: 10, luck: 10 }, value: 50000, levelReq: 50 }),
};

// Loot pools by dungeon tier (indexed by monster level)
export const TIER_LOOT_POOLS: { maxLevel: number; items: string[] }[] = [
  { maxLevel: 5, items: ['rusty_sword', 'cloth_robe', 'leather_cap', 'leather_boots', 'wooden_shield', 'healing_potion', 'mana_potion', 'oak_staff', 'short_bow', 'iron_dagger', 'woodcutter_axe', 'bronze_helm', 'bronze_platebody', 'bronze_platelegs'] },
  { maxLevel: 12, items: ['iron_sword', 'leather_vest', 'chain_hauberk', 'iron_helm', 'iron_platebody', 'iron_platelegs', 'kite_shield', 'crystal_staff', 'yew_longbow', 'poisoned_dagger', 'warhammer', 'greater_healing_potion', 'lucky_charm'] },
  { maxLevel: 25, items: ['steel_longsword', 'steel_helm', 'steel_platebody', 'steel_platelegs', 'knight_blade', 'shadowfang', 'elven_bow', 'crimson_greataxe', 'plate_armor', 'swift_boots', 'ring_of_power', 'elixir_of_life'] },
  { maxLevel: 40, items: ['holy_avenger', 'archon_staff', 'bulwark_shield', 'crown_of_valor', 'amulet_of_vigor'] },
  { maxLevel: 9999, items: ['dragonbone_sword', 'dragonplate', 'celestial_band'] },
];
