import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import { config as dotenvConfig } from "dotenv";
import { join } from "path";

import { errorHandler, ApiError } from "./error/error.handler";
import { errors } from "./error/error.constants";

import { DatabaseService } from "./services/database.service";

import authRoutes from "./auth/auth.routes";
import userRoutes from "./user/user.routes";

dotenvConfig();
const app: Express = express();

const whitelist = ["null", `${process.env.HOSTNAME}`];
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    else {
      if (whitelist.indexOf(origin!) !== -1) {
        return callback(null, true);
      } else {
        console.log("Rejected Origin: `%o`", origin);
        return callback({
          ...errors.CORS_ERROR,
          name: "CORS_ERROR",
        } as ApiError);
      }
    }
  },
};
if (process.env.NODE_ENV === "production") {
  app.use(cors(corsOptions));
} else {
  app.use(cors());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(join(__dirname + "/../client/out")));
//   app.use("*", (req: Request, res: Response, next: NextFunction) => {
//     try {
//       res.render(join(__dirname + "/../client/out/index.html"));
//     } catch (err) {
//       next(err);
//     }
//   });
// } else {
//   app.use("*", (req: Request, res: Response) => {
//     res.status(404).json({
//       success: false,
//       error: `Cannot ${req.method} ${req.originalUrl}`,
//     });
//   });
// }
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.originalUrl}`,
  });
});
app.use(errorHandler);

Promise.all([DatabaseService.getInstance().initalize()])
  .then(() => {
    app.listen(process.env.PORT!, () => {
      console.log(`Listening for Requests on Port ${process.env.PORT}`);
    });
  })
  .catch((_) => {
    process.exit(1);
  });
