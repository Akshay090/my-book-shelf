import { Request, Response, NextFunction } from "express";
import { errors } from "../error/error.constants";
import { verify as jwtVerify } from "jsonwebtoken";

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw errors.UNAUTHORIZED;
    }
    const token = authHeader.split(" ")[1];
    const userInfo = jwtVerify(token, process.env.JWT_SECRET!);
    console.log("jwt user", userInfo);
    next();
  } catch (error) {
    console.log("error checkauth");
    throw errors.UNAUTHORIZED;
  }
};

export default checkAuth;
