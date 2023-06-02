import { request } from 'undici';
import { AppConfig } from '../AppConfig';
import { type OAuthOptions } from '../types/AuthToken';
import { AuthContext } from './AuthContext';

export class BnetHttpClient extends AuthContext {
  private static _instance: BnetHttpClient;

  constructor() {
    const _oauthOption: OAuthOptions = {
      client: {
        id: AppConfig.instance.bnetClientId,
        secret: AppConfig.instance.bnetSecret
      },
      auth: {
        tokenHost: AppConfig.instance.bnetTokenHost
      }
    };
    super(_oauthOption, {});
  }

  public async get(url: string): Promise<any> {
    const token = await this.getToken();
    const { body } = await request(url, {
      headers: {
        'Battlenet-Namespace': 'static-us',
        authorization: `Bearer ${token.access_token as string}`
      }
    });
    return await body.json();
  }

  public static start(): void {
    BnetHttpClient._instance = new BnetHttpClient();
  }

  public static get instance(): BnetHttpClient {
    if (BnetHttpClient._instance === undefined || BnetHttpClient._instance === null) {
      BnetHttpClient._instance = new BnetHttpClient();
    }
    return BnetHttpClient._instance;
  }
}
