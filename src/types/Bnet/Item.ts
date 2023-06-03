import {
  type BnetApiKeyId,
  type BnetApiTypeName,
  type BnetApiLocale,
  type BnetApiRequirements,
  type BnetApiSelf
} from './Common';

export const ItemClass = {
  ARMOR: 'Armor',
  WEAPON: 'Weapon'
};

export const ItemSubclass = {
  SHIELD: 'Shield',
  MISC: 'Miscellaneous',
  POLEARM: 'Polearm',
  DAGGER: 'Dagger',
  LEATHER: 'Leather',
  STAFF: 'Staff',
  SWORD: 'Sword'
};

export type ItemByIdApiResponse = BnetItem;

export interface BnetItem {
  _links: BnetApiSelf;
  id: number;
  name: BnetApiLocale;
  quality: BnetApiTypeName;
  level: number;
  required_level: number;
  media: BnetApiKeyId;
  item_class: BnetApiKeyId;
  item_subclass: BnetApiKeyId;
  inventory_type: BnetApiTypeName;
  purchase_price: number;
  sell_price: number;
  max_count: number;
  is_equippable: boolean;
  is_stackable: boolean;
  preview_item: PreviewItem;
  purchase_quantity: number;
}

export interface PreviewItem {
  item: BnetApiKeyId;
  quality: BnetApiTypeName;
  name: BnetApiLocale;
  media: BnetApiKeyId;
  item_class: BnetApiKeyId;
  item_subclass: BnetApiKeyId;
  inventory_type: BnetApiTypeName;
  binding: BnetApiTypeName;
  weapon?: Weapon;
  armor?: ItemStatsDisplay;
  shield_block?: ItemStatsDisplay;
  set?: ItemSet;
  unique_equipped?: BnetApiLocale;
  limit_category?: BnetApiLocale;
  spells?: Spell[];
  socket_bonus?: BnetApiLocale;
  name_description: ItemStatsDisplay;
  sockets?: Socket[];
  stats: ItemStats[];
  upgrades: ItemUpgrades;
  requirements: BnetApiRequirements;
  level: ItemLevel;
  is_subclass_hidden: boolean;
  toy?: BnetApiLocale;
}

export interface Socket {
  socket_type: BnetApiTypeName;
}

export interface Spell {
  spell: BnetApiKeyId;
  description: BnetApiLocale;
}

export interface ItemSet {
  display_string: BnetApiLocale;
  effects: ItemSetEffect[];
  item_set: BnetApiKeyId;
  items: Item[];
}

export interface Item {
  item: BnetApiKeyId;
}

export interface ItemSetEffect {
  display_string: BnetApiLocale;
  required_count: number;
}

export interface ItemLevel {
  value: number;
  display_string: BnetApiLocale;
}

export interface Weapon {
  damage: WeaponDamage;
  damage_class?: BnetApiTypeName;
  attack_speed: WeaponAttackSpeedAndDps;
  dps: WeaponAttackSpeedAndDps;
}

export interface WeaponDamage {
  min_value: number;
  max_value: number;
  display_string: BnetApiLocale;
  damage_class: BnetApiTypeName;
}

export interface WeaponAttackSpeedAndDps {
  value: number;
  display_string: BnetApiLocale;
}

export interface ItemStats {
  type: BnetApiTypeName;
  value: number;
  display: ItemStatsDisplay;
  is_equip_bonus?: boolean;
}

export interface ItemStatsDisplay {
  display_string: BnetApiLocale;
  color: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

export interface ItemUpgrades {
  value: number;
  max_value: number;
  display_string: BnetApiLocale;
}
