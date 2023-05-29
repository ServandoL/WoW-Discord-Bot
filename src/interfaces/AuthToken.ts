export interface OAuthOptions {
  client: {
    id: string;
    secret: string;
  };
  auth: {
    tokenHost: string;
  };
}
