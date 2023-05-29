export class AppConfig {
  private static _instance: AppConfig;
  private readonly _discordToken: string;
  private readonly _discordClientId: string;
  private readonly _discordGuildId: string;
  private readonly _bnetClientId: string;
  private readonly _bnetSecret: string;
  private readonly _bnetTokenHost: string;

  constructor() {
    this._discordToken = process.env.DISCORD_TOKEN ?? '';
    this._discordClientId = process.env.DISCORD_CLIENT_ID ?? '';
    this._discordGuildId = process.env.DISCORD_GUILD_ID ?? '';
    this._bnetClientId = process.env.BNET_CLIENT_ID ?? '';
    this._bnetSecret = process.env.BNET_SECRET ?? '';
    this._bnetTokenHost = process.env.BNET_TOKEN_HOST ?? '';
  }

  public static get instance(): AppConfig {
    if (AppConfig._instance === undefined || AppConfig._instance === null) {
      AppConfig._instance = new AppConfig();
    }
    return AppConfig._instance;
  }

  public get bnetTokenHost(): string {
    return AppConfig.instance._bnetTokenHost;
  }

  public get bnetClientId(): string {
    return AppConfig.instance._bnetClientId;
  }

  public get bnetSecret(): string {
    return AppConfig.instance._bnetSecret;
  }

  public get clientId(): string {
    return AppConfig.instance._discordClientId;
  }

  public get guildId(): string {
    return AppConfig.instance._discordGuildId;
  }

  public get token(): string {
    return AppConfig.instance._discordToken;
  }
}
