import { type BnetApiLocale, type BnetApiKeyId, type BnetApiSelf } from './Common';

export interface AchievementsIndexApiResponse {
  _links: BnetApiSelf;
  achievements: BnetApiKeyId[];
}

export interface AchievementByIdApiResponse {
  _links: BnetApiSelf;
  id: number;
  category: BnetApiKeyId;
  name: BnetApiLocale;
  description: BnetApiLocale;
  points: number;
  is_account_wide: boolean;
  next_achievement: BnetApiKeyId;
  media: BnetApiKeyId;
}
