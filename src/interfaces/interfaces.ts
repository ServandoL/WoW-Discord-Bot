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
