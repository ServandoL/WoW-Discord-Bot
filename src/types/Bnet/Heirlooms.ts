import { type BnetApiLocale, type BnetApiKeyId, type BnetApiSelf, type BnetApiTypeName } from './Common';
import { type PreviewItem } from './Item';

export interface RootItemUpgrades {
  item: HeirloomItem;
  level: number;
}
export interface HeirloomIndexApiResponse {
  _links: BnetApiSelf;
  heirlooms: BnetApiKeyId[];
}

export interface HeirloomByIdApiResponse {
  _links: BnetApiSelf;
  id: number;
  item: BnetApiKeyId;
  source: BnetApiTypeName;
  source_description: BnetApiLocale;
  upgrades: RootItemUpgrades[];
  media: BnetApiKeyId;
}

export interface HeirloomItem extends PreviewItem {
  context: number;
  bonus_list: number[];
}
