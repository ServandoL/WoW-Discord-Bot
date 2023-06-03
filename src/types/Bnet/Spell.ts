import { type BnetApiKeyId, type BnetApiLocale } from './Common';

export interface SpellByIdApiResponse {
  id: number;
  name: BnetApiLocale;
  description: BnetApiLocale;
  media: BnetApiKeyId;
}
