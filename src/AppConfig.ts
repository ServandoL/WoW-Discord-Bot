export class AppConfig {
  private static _instance: AppConfig;
  private _token: string;
  private _clientId: string;
  private _guildId: string;

  constructor() {
    this._token = process.env.DISCORD_TOKEN ?? '';
    this._clientId = process.env.CLIENT_ID ?? '';
    this._guildId = process.env.GUILD_ID ?? '';
  }

  public static get instance() {
    if (!AppConfig._instance) {
      AppConfig._instance = new AppConfig();
    }
    return AppConfig._instance;
  }

  public get clientId() {
    return AppConfig.instance._clientId;
  }

  public get guildId() {
    return AppConfig.instance._guildId;
  }

  public get token() {
    return AppConfig.instance._token;
  }
}
