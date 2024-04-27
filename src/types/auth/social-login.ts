export type SocialLogin = {
  registrationId: string;
  provider: CommonOauthProvider;
};

export enum CommonOauthProvider {
  GOOGLE = "GOOGLE",
  GITHUB = "GITHUB",
  FACEBOOK = "FACEBOOK",
  OKTA = "OKTA",
}
