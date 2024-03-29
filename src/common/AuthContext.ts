import { logger } from '../logger';
import { type OAuthOptions } from '../types/AuthToken';
import oauth2 from 'simple-oauth2';

export class AuthContext {
  private _token: oauth2.AccessToken | undefined = undefined;
  private readonly _client: oauth2.ClientCredentials;
  private readonly _scope: oauth2.ClientCredentialTokenConfig;
  constructor(options: OAuthOptions, scope: oauth2.ClientCredentialTokenConfig) {
    this._client = new oauth2.ClientCredentials(options);
    this._scope = scope;
  }

  async getToken(): Promise<oauth2.Token> {
    try {
      if (this._token === null || this._token === undefined || this._token.expired()) {
        const token = await this._client.getToken(this._scope);
        this._token = this._client.createToken(token.token);
      }
      return this._token.token;
    } catch (error) {
      const message = `AuthContext: Access Token error: ${JSON.stringify(error)}`;
      logger.error(message);
      throw new Error(message);
    }
  }

  public get token(): oauth2.AccessToken | undefined {
    return this._token;
  }
}
