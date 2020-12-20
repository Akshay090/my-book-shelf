import { Request, Response, NextFunction, Router } from "express";

import validateQuery from "../middlewares/validate-query";
import { validateJwt } from "../middlewares/validate-jwt";
import {
  addBookRequest,
  addBookRequestSchema,
  userListRequest,
  userListRequestSchema,
  userProfileSetRequest,
  userProfileSetRequestSchema,
} from "./user.schema";
import { setUserProfile, addBook, listUsers } from "./user.service";
import { userInfo } from "../auth/auth.schema";

const router: Router = Router();

const handlePostUserProfileSet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { iat, exp, iss, ...userInfo } = res.locals.user;
    const profile = req.body as userProfileSetRequest;
    await setUserProfile(profile, userInfo as userInfo);
    res.status(201).json({
      success: true,
      message: "User profile set",
    });
  } catch (err) {
    next(err);
  }
};

const handlePostUserBookAdd = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { iat, exp, iss, ...userInfo } = res.locals.user;
    const book = req.body as addBookRequest;
    await addBook(book, userInfo as userInfo);
    res.status(201).json({
      success: true,
      message: "Book added",
    });
  } catch (err) {
    next(err);
  }
};

const handleGetUserList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query as userListRequest;
    const users = await listUsers(query);
    res.json({
      success: true,
      users,
    });
  } catch (err) {
    next(err);
  }
};

router.post(
  "/user/profile/set",
  validateJwt(true),
  validateQuery("body", userProfileSetRequestSchema),
  handlePostUserProfileSet
);
router.post(
  "/user/book/add",
  validateJwt(true),
  validateQuery("body", addBookRequestSchema),
  handlePostUserBookAdd
);

router.get(
  "/user/list",
  validateJwt(true),
  validateQuery("query", userListRequestSchema),
  handleGetUserList
);

export default router;
