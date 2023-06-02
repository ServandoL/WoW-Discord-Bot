import { type BnetApiLocale, type BnetApiKeyId, type BnetApiSelf, type BnetApiTypeName } from './Common';
import { type RootItemUpgrades } from './Item';

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
  upgrades: RootItemUpgrades;
  media: BnetApiKeyId;
}
