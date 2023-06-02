import { type BnetApiKeyId, type BnetApiTypeName, type BnetApiLocale, type BnetApiRequirements } from './Common';

export interface RootItemUpgrades {
  item: BnetItem[];
  level: number;
}

export interface BnetItem {
  item: BnetApiKeyId;
  context: number;
  bonus_list: number[];
  quality: BnetApiTypeName;
  name: BnetApiLocale;
  media: BnetApiKeyId;
  item_class: BnetApiKeyId;
  item_subclass: BnetApiKeyId;
  inventory_type: BnetApiTypeName;
  binding: BnetApiTypeName;
  weapon: Weapon;
  stats: ItemStats[];
  upgrades: ItemUpgrades;
  requirements: BnetApiRequirements;
  level: ItemLevel;
}

export interface ItemLevel {
  value: number;
  display_string: BnetApiLocale;
}

export interface Weapon {
  damage: WeaponDamage;
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
