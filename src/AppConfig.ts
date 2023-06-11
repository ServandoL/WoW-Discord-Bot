import { type Cipher, type ApplicationConfiguration } from './types/interfaces';

export class AppConfig {
  private static _instance: AppConfig;
  private readonly _applicationConfigs: ApplicationConfiguration;

  constructor() {
    this._applicationConfigs = {
      discordToken: process.env.DISCORD_TOKEN ?? '',
      discordClientId: process.env.DISCORD_CLIENT_ID ?? '',
      discordGuildId: process.env.DISCORD_GUILD_ID ?? '',
      bnetClientId: process.env.BNET_CLIENT_ID ?? '',
      bnetSecret: process.env.BNET_SECRET ?? '',
      bnetTokenHost: process.env.BNET_TOKEN_HOST ?? '',
      bnetApi: process.env.BNET_API ?? '',
      port: process.env.PORT ?? '8080',
      type: process.env.TYPE ?? 'APP',
      logLevel: process.env.LOG_LEVEL ?? 'info',
      mongo: {
        mongoUrl: process.env.MONGO_URL ?? '',
        lorebotDb: process.env.LOREBOT_DB ?? '',
        webhooksColn: process.env.WEBHOOKS_COLN ?? ''
      },
      crypto: {
        cipher: process.env.CIPHER ?? '',
        password: process.env.PASSWORD ?? '',
        salt: process.env.SALT ?? '',
        keyLen: process.env.KEYLEN ? +process.env.KEYLEN : 0,
        encoding: process.env.ENCODING ?? '',
        bytes: process.env.BYTE_SIZE ? +process.env.BYTE_SIZE : 0
      },
      dailyCron: process.env.DAILY_CRON_SCHEDULER ?? ''
    };
  }

  public static get instance(): AppConfig {
    if (AppConfig._instance === undefined || AppConfig._instance === null) {
      AppConfig._instance = new AppConfig();
    }
    return AppConfig._instance;
  }

  public get dailyCron(): string {
    return AppConfig.instance._applicationConfigs.dailyCron;
  }

  public get crypto(): Cipher {
    return {
      cipher: AppConfig.instance._applicationConfigs.crypto.cipher,
      password: AppConfig.instance._applicationConfigs.crypto.password,
      salt: AppConfig.instance._applicationConfigs.crypto.salt,
      keyLen: AppConfig.instance._applicationConfigs.crypto.keyLen,
      encoding: AppConfig.instance._applicationConfigs.crypto.encoding,
      bytes: AppConfig.instance._applicationConfigs.crypto.bytes
    };
  }

  public get mongoUrl(): string {
    return AppConfig.instance._applicationConfigs.mongo.mongoUrl;
  }

  public get lorebotDb(): string {
    return AppConfig.instance._applicationConfigs.mongo.lorebotDb;
  }

  public get webhooksColn(): string {
    return AppConfig.instance._applicationConfigs.mongo.webhooksColn;
  }

  public get logLevel(): string {
    return AppConfig.instance._applicationConfigs.logLevel;
  }

  public get type(): string {
    return AppConfig.instance._applicationConfigs.type;
  }

  public get port(): number {
    return +AppConfig.instance._applicationConfigs.port;
  }

  public get bnetApi(): string {
    return AppConfig.instance._applicationConfigs.bnetApi;
  }

  public get bnetTokenHost(): string {
    return AppConfig.instance._applicationConfigs.bnetTokenHost;
  }

  public get bnetClientId(): string {
    return AppConfig.instance._applicationConfigs.bnetClientId;
  }

  public get bnetSecret(): string {
    return AppConfig.instance._applicationConfigs.bnetSecret;
  }

  public get clientId(): string {
    return AppConfig.instance._applicationConfigs.discordClientId;
  }

  public get guildId(): string {
    return AppConfig.instance._applicationConfigs.discordGuildId;
  }

  public get token(): string {
    return AppConfig.instance._applicationConfigs.discordToken;
  }
}
