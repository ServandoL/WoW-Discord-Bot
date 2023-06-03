import { type BnetApiKeyId, type BnetApiLocale } from './Common';

export interface ClassIndexApiResponse {
  classes: BnetApiKeyId[];
}

export interface ClassByIdApiResponse {
  id: number;
  name: BnetApiLocale;
  power_type: BnetApiKeyId;
  specializations: BnetApiKeyId[];
  media: BnetApiKeyId;
  playable_races: BnetApiKeyId[];
}
