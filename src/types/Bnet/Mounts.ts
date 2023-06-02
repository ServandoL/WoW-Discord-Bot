import { type KeyValuePair } from '../interfaces';
import {
  type BnetApiSelf,
  type BnetApiKeyId,
  type BnetApiTypeName,
  type BnetApiRequirements,
  type BnetApiLocale
} from './Common';

export interface MountIndex {
  key: {
    href: string;
  };
  name: BnetApiLocale;
  id: number;
}

export interface MountIndexApiResponse {
  _links: BnetApiSelf;
  mounts: MountIndex[];
}

export interface MountByIdApiResponse {
  _links: BnetApiSelf;
  id: number;
  name: BnetApiLocale;
  creature_displays: BnetApiKeyId[];
  description: BnetApiLocale;
  source: BnetApiTypeName;
  faction: BnetApiTypeName;
  requirements: BnetApiRequirements;
}

export interface MountDisplay {
  _links: BnetApiSelf;
  assets: KeyValuePair[];
}
