import { type BnetApiKeyId, type BnetApiTypeName, type BnetApiSelf, type BnetApiRequirements } from './interfaces';

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

export interface BnetApiLocale {
  en_US: string;
  [key: string]: string;
}

export interface MountDisplay {
  _links: BnetApiSelf;
  assets: KeyValuePair[];
}

export interface KeyValuePair {
  key: string;
  value: string;
}
