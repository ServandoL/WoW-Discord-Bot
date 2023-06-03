import { type BnetApiTypeName, type BnetApiKeyId, type BnetApiLocale } from './Common';

export interface ReputationFactionIndexApiResponse {
  factions: BnetApiKeyId[];
}

export interface ReputationFactionByIdApiResponse {
  id: number;
  name: BnetApiLocale;
  description: BnetApiLocale;
  reputation_tiers: BnetApiKeyId;
  factions?: BnetApiKeyId[];
  player_faction?: BnetApiTypeName;
}

export interface ReputationTierByIdApiResponse {
  id: number;
  tiers: ReputationTiers[];
}

export interface ReputationTiers {
  name: BnetApiLocale;
  min_value: number;
  max_value: number;
  id: number;
}
