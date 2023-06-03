import { type BnetApiKeyId, type BnetApiLocale } from './Common';
import { type ItemSetEffect } from './Item';

export interface ItemSetApiResponse {
  item_sets: BnetApiKeyId[];
}

export interface ItemSetByIdApiResponse {
  id: number;
  name: BnetApiLocale;
  items: BnetApiKeyId[];
  effects: ItemSetEffect[];
}
