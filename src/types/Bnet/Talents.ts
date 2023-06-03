import { type BnetApiKeyId, type BnetApiLocale } from './Common';

export interface TalentIndexApiResponse {
  talents: BnetApiKeyId[];
}

export interface TalentByIdApiResponse {
  id: number;
  rank_descriptions: RankDescriptions[];
  spell?: BnetApiKeyId;
  playable_class?: BnetApiKeyId;
}

export interface RankDescriptions {
  rank: number;
  description: BnetApiLocale;
}
