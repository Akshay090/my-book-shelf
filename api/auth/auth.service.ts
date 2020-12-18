import OAuth from "oauth-1.0a";
import crypto from "crypto";
import Axios from "axios";
import { parse, stringify } from "qs";
import { sign as jwtSign } from "jsonwebtoken";

import { errors } from "../error/error.constants";
import {
  requestTokenResponse,
  accessTokenResponse,
  userInfo,
} from "./auth.schema";

export const OAuthGenerate = async (): Promise<string> => {
  const { oauth_token } = await getRequestToken();
  return oauth_token;
};

const getRequestToken = async (): Promise<requestTokenResponse> => {
  try {
    const oauth = new OAuth({
      consumer: {
        key: process.env.TWITTER_API_KEY!,
        secret: process.env.TWITTER_API_SECRET!,
      },
      signature_method: "HMAC-SHA1",
      hash_function: (base_string, key) => {
        return crypto
          .createHmac("sha1", key)
          .update(base_string)
          .digest("base64");
      },
    });
    const request_data = {
      method: "POST",
      url: "https://api.twitter.com/oauth/request_token",
      data: {
        oauth_callback: `${process.env.API_HOSTNAME}/api/v1/auth/callback`!,
      },
    };
    const data = await Axios.post(
      request_data.url,
      {},
      {
        headers: oauth.toHeader(oauth.authorize(request_data)),
      }
    );
    const response = (parse(data.data) as unknown) as requestTokenResponse;
    if (response.oauth_callback_confirmed !== "true") throw errors.UNAUTHORIZED;
    return response;
  } catch (err) {
    if (!err.response) throw err;
    else throw errors.UNAUTHORIZED;
  }
};

export const getAccessToken = async (
  oauth_token: string,
  oauth_verifier: string
): Promise<{ key: string; secret: string }> => {
  const {
    oauth_token: accessToken,
    oauth_token_secret: accessTokenSecret,
  } = await exchangeForAccessToken(oauth_token, oauth_verifier);
  return { key: accessToken, secret: accessTokenSecret };
};

const exchangeForAccessToken = async (
  oauth_token: string,
  oauth_verifier: string
): Promise<accessTokenResponse> => {
  try {
    const qs = stringify({ oauth_token, oauth_verifier });
    const { data } = await Axios.post(
      `https://api.twitter.com/oauth/access_token?${qs}`,
      {}
    );
    const response = (parse(data) as unknown) as accessTokenResponse;
    return response;
  } catch (err) {
    if (!err.response) throw err;
    else throw errors.UNAUTHORIZED;
  }
};

export const getUserInfo = async (accessToken: {
  key: string;
  secret: string;
}): Promise<userInfo> => {
  try {
    const oauth = new OAuth({
      consumer: {
        key: process.env.TWITTER_API_KEY!,
        secret: process.env.TWITTER_API_SECRET!,
      },
      signature_method: "HMAC-SHA1",
      hash_function: (base_string, key) => {
        return crypto
          .createHmac("sha1", key)
          .update(base_string)
          .digest("base64");
      },
    });
    const qs = stringify({
      include_entities: false,
      skip_status: true,
      include_email: true,
    });
    const request_data = {
      method: "GET",
      url: `https://api.twitter.com/1.1/account/verify_credentials.json?${qs}`,
    };
    const { data } = await Axios.get<userInfo>(request_data.url, {
      headers: oauth.toHeader(oauth.authorize(request_data, accessToken)),
    });
    return data;
  } catch (err) {
    if (!err.response) throw err;
    else throw errors.UNAUTHORIZED;
  }
};

export const generateJwt = async (userInfo: userInfo): Promise<string> => {
  const jwt = jwtSign(
    {
      email: userInfo.email,
      id: userInfo.id,
      name: userInfo.name,
      profileBackground: userInfo.profile_background_image_url_https,
      profilePicture: userInfo.profile_image_url_https,
      username: userInfo.screen_name,
    },
    process.env.JWT_SECRET!,
    {
      issuer: "team-bibliophile",
      expiresIn: "1d",
    }
  );
  return jwt;
};
