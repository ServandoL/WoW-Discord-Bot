import { type BnetApiLocale } from './Mounts';

export enum FactChoice {
  ACHIEVEMENTS,
  CREATURE,
  HEIRLOOM,
  ITEM,
  MEDIA,
  MOUNT,
  PET,
  RACE,
  SPEC,
  QUEST,
  SPELL,
  REP,
  TALENT,
  TOY,
  TITLE,
  CLASS
}

export interface ApplicationConfiguration {
  discordToken: string;
  discordClientId: string;
  discordGuildId: string;
  bnetClientId: string;
  bnetSecret: string;
  bnetTokenHost: string;
  bnetApi: string;
}

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
}

export interface BnetApiTypeName {
  type: string;
  name: BnetApiLocale;
}

export interface BnetApiRequirements {
  faction: BnetApiTypeName;
}
export interface EmbedBuilderFields {
  name: string;
  value: string;
  inline?: boolean;
}
