import { webcrypto } from "node:crypto";
import { env } from "node:process";
import { Authenticator } from "remix-auth";
import { OAuth2Strategy } from "remix-auth-oauth2";
import { type User } from "./auth.type";
import { isMember } from "./check-google-doc-member.server";
import { SITE_URL } from "./constants";

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as Crypto;
}

type GoogleUserInfo = {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
};

const clientId = env.GOOGLE_OAUTH_CLIENT_ID ?? env.GOOGLE_CLIENT_ID ?? "";
const clientSecret =
  env.GOOGLE_OAUTH_CLIENT_SECRET ?? env.GOOGLE_CLIENT_SECRET ?? "";
const appUrl =
  env.NODE_ENV === "development" ? "http://localhost:5173" : SITE_URL;
const redirectURI =
  env.GOOGLE_OAUTH_REDIRECT_URI ?? `${appUrl}/auth/google/callback`;

export const authenticator = new Authenticator<User>();

const googleStrategy = new OAuth2Strategy<User>(
  {
    clientId,
    clientSecret,
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
    tokenRevocationEndpoint: "https://oauth2.googleapis.com/revoke",
    redirectURI,
    scopes: ["openid", "email", "profile"],
  },
  async ({ tokens }) => {
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken()}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to load Google user profile");
    }

    const profile = (await response.json()) as GoogleUserInfo;
    if (!profile.email || !profile.sub) {
      throw new TypeError("Google profile is missing required fields");
    }

    const member = await isMember(profile.email);
    if (!member) {
      throw new TypeError("Not a member");
    }

    return {
      id: profile.sub,
      displayName: profile.name ?? profile.email,
      email: profile.email,
      photo: profile.picture ?? "",
    };
  }
);

authenticator.use(googleStrategy, "google");
