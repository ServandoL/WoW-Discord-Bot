import { type BnetApiLocale, type BnetApiKeyId, type BnetApiTypeName } from './Common';

export interface ToyIndexApiResponse {
  toys: BnetApiKeyId[];
}

export interface ToyByIdApiResponse {
  id: number;
  item: BnetApiKeyId;
  source: BnetApiTypeName;
  source_description?: BnetApiLocale;
  media: BnetApiKeyId;
}
