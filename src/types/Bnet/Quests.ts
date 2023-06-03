import { type BnetApiKeyId, type BnetApiLocale, type BnetApiSelf } from './Common';

export interface QuestIndexApiResponse {
  _links: BnetApiSelf;
  areas: {
    href: string;
  };
}

export interface QuestAreasApiResponse {
  _links: BnetApiSelf;
  areas: BnetApiKeyId[];
}

export interface SingleQuestAreaApiResponse {
  _links: BnetApiSelf;
  id: number;
  area: BnetApiLocale;
  quests: BnetApiKeyId[];
}

export interface QuestByIdApiResponse {
  _links: BnetApiSelf;
  id: number;
  title: BnetApiLocale;
  area: BnetApiKeyId;
  description: BnetApiLocale;
  requirements: {
    min_character_level: number;
    max_character_level: number;
  };
  rewards: QuestRewards;
}

export interface QuestRewards {
  experience: number;
  reputations: ReputationReward[];
  money: MoneyReward;
}

export interface MoneyReward {
  value: number;
  units: {
    gold: number;
    silver: number;
    copper: number;
  };
}

export interface ReputationReward {
  reward: BnetApiKeyId;
  value: number;
}
