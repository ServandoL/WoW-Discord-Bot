import { type BnetApiKeyId, type BnetApiLocale, type BnetApiSelf, type BnetApiTypeName } from './Common';

export interface RaceIndexApiResponse {
  _links: BnetApiSelf;
  races: BnetApiKeyId[];
}

export interface RaceByIdApiResponse {
  _links: BnetApiSelf;
  id: number;
  name: BnetApiLocale;
  faction: BnetApiTypeName;
  is_selectable: boolean;
  is_allied_race: boolean;
  playable_classes: BnetApiKeyId[];
}
