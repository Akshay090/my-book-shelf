import * as yup from "yup";

export interface requestTokenResponse {
  oauth_token: string;
  oauth_token_secret: string;
  oauth_callback_confirmed: string;
}

export const oauthCallbackSchema = yup
  .object({
    oauth_token: yup
      .string()
      .trim()
      .min(1, "oauth_token cannot be null")
      .required(),
    oauth_verifier: yup
      .string()
      .trim()
      .min(1, "oauth_verifier cannot be null")
      .required(),
  })
  .required();
export type oauthCallback = yup.InferType<typeof oauthCallbackSchema>;

export interface accessTokenResponse {
  oauth_token: string;
  oauth_token_secret: string;
  user_id: string;
  screen_name: string;
}

export interface userInfo {
  id: number;
  name: string;
  screen_name: string;
  profile_background_image_url_https: string;
  profile_image_url_https: string;
  email: string;
}
