import { AppConfig } from '../AppConfig';
import { type OAuthOptions } from '../types/AuthToken';
import { AuthContext } from './AuthContext';

export class BnetAuthClient extends AuthContext {
  private static _instance: BnetAuthClient;
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

  public static start(): void {
    BnetAuthClient._instance = new BnetAuthClient();
  }

  public static get instance(): BnetAuthClient {
    if (BnetAuthClient._instance === undefined || BnetAuthClient._instance === null) {
      BnetAuthClient._instance = new BnetAuthClient();
    }
    return BnetAuthClient._instance;
  }
}
