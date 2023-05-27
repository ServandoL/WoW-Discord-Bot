export class AppConfig {
  private static _instance: AppConfig;
  private _token: string;

  constructor() {
    this._token = process.env.DISCORD_TOKEN ?? '';
  }

  public static get instance() {
    if (!AppConfig._instance) {
      AppConfig._instance = new AppConfig();
    }
    return AppConfig._instance;
  }

  public get token() {
    return AppConfig.instance._token;
  }
}
