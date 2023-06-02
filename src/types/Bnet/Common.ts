import { type KeyValuePair } from '../interfaces';

export interface BnetApiSelf {
  _links: {
    self: {
      href: string;
    };
  };
}

export interface BnetApiKeyId {
  key: {
    href: string;
  };
  id: number;
  name?: string | BnetApiLocale;
}

export interface BnetApiTypeName {
  type: string;
  name: BnetApiLocale;
}

export interface BnetApiRequirements {
  faction?: BnetApiTypeName;
  level?: BnetApiLocale;
}

export interface BnetApiLocale {
  __typename: 'BnetApiLocale';
  en_US: string;
  [key: string]: string;
}

export interface BnetMediaDisplay {
  _links: BnetApiSelf;
  assets: KeyValuePair[];
}
