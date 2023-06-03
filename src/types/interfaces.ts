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
  CLASS,
  ITEM_SET
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

export interface EmbedBuilderFields {
  name: string;
  value: string;
  inline?: boolean;
}

export interface KeyValuePair {
  key: string;
  value: string;
}
