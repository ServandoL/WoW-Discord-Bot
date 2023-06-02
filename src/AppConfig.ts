import { type ApplicationConfiguration } from './types/interfaces';

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
      bnetApi: process.env.BNET_API ?? ''
    };
  }

  public static get instance(): AppConfig {
    if (AppConfig._instance === undefined || AppConfig._instance === null) {
      AppConfig._instance = new AppConfig();
    }
    return AppConfig._instance;
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
