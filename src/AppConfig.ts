/* eslint-disable @typescript-eslint/space-before-function-paren */
export class AppConfig {
  private static _instance: AppConfig;
  private readonly _token: string;
  private readonly _clientId: string;
  private readonly _guildId: string;

  constructor() {
    this._token = process.env.DISCORD_TOKEN ?? '';
    this._clientId = process.env.CLIENT_ID ?? '';
    this._guildId = process.env.GUILD_ID ?? '';
  }

  public static get instance(): AppConfig {
    if (AppConfig._instance === undefined || AppConfig._instance === null) {
      AppConfig._instance = new AppConfig();
    }
    return AppConfig._instance;
  }

  public get clientId(): string {
    return AppConfig.instance._clientId;
  }

  public get guildId(): string {
    return AppConfig.instance._guildId;
  }

  public get token(): string {
    return AppConfig.instance._token;
  }
}
