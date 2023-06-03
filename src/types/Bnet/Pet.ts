import { type BnetApiLocale, type BnetApiKeyId, type BnetApiSelf, type BnetApiTypeName } from './Common';

export interface PetIndexApiResponse {
  _links: BnetApiSelf;
  pets: BnetApiKeyId[];
}

export interface PetByIdApiResponse {
  _links: BnetApiSelf;
  id: number;
  name: BnetApiLocale;
  battle_pet_type: BnetApiTypeName;
  description: BnetApiLocale;
  is_capturable: boolean;
  is_tradable: boolean;
  is_battlepet: boolean;
  is_alliance_only: boolean;
  is_horde_only: boolean;
  abilities: Ability[];
  source: BnetApiTypeName;
  icon: string;
  creature: BnetApiKeyId;
  is_random_creature_display: boolean;
  media: BnetApiKeyId;
}

export interface Ability {
  ability: BnetApiKeyId;
  slot: number;
  required_level: number;
}
