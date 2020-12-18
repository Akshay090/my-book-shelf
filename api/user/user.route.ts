import { Request, Response, NextFunction, Router } from "express";
import { userInfo } from "../auth/auth.schema";
import validateQuery from "../middlewares/validate-query";
import { validateJwt } from "../middlewares/validateJwt";
import { userProfile, userProfileSchema } from "./user.schema";

const router: Router = Router();

const handleSetProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDetails = res.locals.user as userInfo;
    console.log("userProfile", userDetails);
  } catch (err) {
    next(err);
  }
};

router.post("/profile/set", validateJwt(), handleSetProfile);

export default router;
