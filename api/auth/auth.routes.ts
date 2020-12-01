import { Request, Response, NextFunction, Router } from "express";

import validateQuery from "../middlewares/validate-query";
import { dummySchema, dummyType } from "./auth.schema";
import { dummyService } from "./auth.service";

const router: Router = Router();

const handlePostTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { dummyData } = req.body as dummyType;
    const result = await dummyService({ dummyData });
    res.json({
      success: true,
      message: "dummyService was executed",
    });
  } catch (err) {
    next(err);
  }
};

router.post("/test", validateQuery("body", dummySchema), handlePostTest);

export default router;
