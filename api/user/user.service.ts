import { userInfo } from "../auth/auth.schema";
import { errors } from "../error/error.constants";
import { DatabaseService } from "../services/database.service";
import {
  userDBSchema,
  userProfileSetRequest,
  addBookRequest,
  userListRequest,
} from "./user.schema";

export const setUserProfile = async (
  profile: userProfileSetRequest,
  userInfo: userInfo
): Promise<void> => {
  const db = await DatabaseService.getInstance().getDb("users");
  const user: userDBSchema = { twitter: userInfo, ...profile, bookshelf: [] };
  const result = await db.insertOne(user);
  if (!result.result.ok) throw errors.MONGODB_QUERY_ERROR;
};

export const addBook = async (
  book: addBookRequest,
  userInfo: userInfo
): Promise<void> => {
  const db = await DatabaseService.getInstance().getDb("users");
  const userExists = await db.findOne<userDBSchema>({
    "twitter.id": userInfo.id,
    "twitter.email": userInfo.email,
  });
  if (!userExists) throw errors.USER_NOT_FOUND;
  const result = await db.updateOne(
    {
      "twitter.id": userInfo.id,
      "twitter.email": userInfo.email,
    },
    {
      $push: { bookshelf: { $each: [...book.books] } },
    }
  );
};

export const listUsers = async (
  query: userListRequest
): Promise<Array<userDBSchema>> => {
  const searchFilter = {
    ...(query.city && { city: query.city }),
    ...(query.country && { country: query.country }),
  };
  const db = await DatabaseService.getInstance().getDb("users");
  const users = await db.find<userDBSchema>(searchFilter).toArray();
  return users;
};
