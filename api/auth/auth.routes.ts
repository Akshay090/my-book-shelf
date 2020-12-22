import { Request, Response, NextFunction, Router } from "express";

import validateQuery from "../middlewares/validate-query";
import {
  OAuthGenerate,
  getAccessToken,
  getUserInfo,
  generateJwt,
} from "./auth.service";
import { oauthCallback, oauthCallbackSchema } from "./auth.schema";
import { validateJwt } from "../middlewares/validate-jwt";

const router: Router = Router();

const handleGetGenerate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const OAuthToken = await OAuthGenerate();
    res.redirect(
      `https://api.twitter.com/oauth/authorize?oauth_token=${OAuthToken}`
    );
  } catch (err) {
    next(err);
  }
};

const handleGetCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oauth_token, oauth_verifier } = req.query as oauthCallback;
    const accessToken = await getAccessToken(oauth_token, oauth_verifier);
    const userInfo = await getUserInfo(accessToken);
    const token = await generateJwt(userInfo);
    const tokenParam = Buffer.from(token).toString("base64");
    if (process.env.NODE_ENV === "production")
      res.redirect(
        `${process.env.CLIENT_HOSTNAME}/user/dashboard?token=${tokenParam}`
      );
    else
      res.redirect(`http://localhost:3000/user/dashboard?token=${tokenParam}`);
  } catch (err) {
    next(err);
  }
};

const handleGetCheckToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(201).json({
      success: true,
      message: "Valid token",
    });
  } catch (err) {
    next(err);
  }
};
router.get("/auth/checkToken", validateJwt(), handleGetCheckToken);

router.get("/auth/generate", handleGetGenerate);
router.get(
  "/auth/callback",
  validateQuery("query", oauthCallbackSchema),
  handleGetCallback
);

export default router;
