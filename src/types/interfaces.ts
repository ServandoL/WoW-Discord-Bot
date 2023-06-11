import { type Document, type WithId } from 'mongodb';

export enum FactChoice {
  ACHIEVEMENTS,
  // CREATURE,
  HEIRLOOM,
  // ITEM,
  // MEDIA,
  MOUNT,
  PET,
  RACE,
  SPEC,
  QUEST,
  // SPELL,
  REP,
  TALENT,
  TOY,
  TITLE,
  CLASS,
  ITEM_SET
}

export interface IEncrypted {
  iv: string;
  encryptedData: string;
}

export interface ApplicationConfiguration {
  discordToken: string;
  discordClientId: string;
  discordGuildId: string;
  bnetClientId: string;
  bnetSecret: string;
  bnetTokenHost: string;
  bnetApi: string;
  port: string;
  type: string;
  logLevel: string;
  mongo: MongoClientConfiguration;
  crypto: Cipher;
  dailyCron: string;
}

export interface Cipher {
  cipher: string;
  password: string;
  salt: string;
  keyLen: number;
  encoding: string;
  bytes: number;
}

export interface MongoClientConfiguration {
  mongoUrl: string;
  lorebotDb: string;
  webhooksColn: string;
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

export interface WebhookDocument extends WithId<Document> {
  data: string;
  iv: string;
  createdDate: Date;
}

export enum DeleteResponse {
  NOT_FOUND,
  FOUND,
  ERROR
}

export enum AddWebhookResponse {
  ERROR,
  BAD_URL,
  SUCCESS
}
