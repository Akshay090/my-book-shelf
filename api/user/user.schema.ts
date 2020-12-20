import * as yup from "yup";
import { userInfo } from "../auth/auth.schema";

export const userProfileSetRequestSchema = yup
  .object({
    profile: yup.string().min(1, "profile cannot be null").required(),
    description: yup
      .string()
      .trim()
      .min(1, "description cannot be null")
      .max(140, "description max length: 140 characters")
      .required(),
    city: yup
      .string()
      .trim()
      .min(1, "city cannot be null")
      .max(189, "city max length: 189 characters")
      .required(),
    country: yup
      .string()
      .trim()
      .min(1, "country cannot be null")
      .max(90, "country max length: 90 characters")
      .required(),
  })
  .required();

export type userProfileSetRequest = yup.InferType<
  typeof userProfileSetRequestSchema
>;

const bookSchema = yup.object({
  title: yup.string().trim().min(1, "title cannot be null").required(),
  description: yup
    .string()
    .trim()
    .min(1, "description cannot be null")
    .required(),
  isbn: yup.string().trim().min(1, "isbn cannot be null").required(),
  imageUrl: yup
    .string()
    .trim()
    .min(1, "imageUrl cannot be null")
    .url("imageUrl not a valid url")
    .required(),
});

type bookDBSchema = yup.InferType<typeof bookSchema>;

export const addBookRequestSchema = yup
  .object({
    books: yup
      .array(bookSchema)
      .min(1, "minimum length of books is 1 book")
      .required(),
  })
  .required();

export type addBookRequest = yup.InferType<typeof addBookRequestSchema>;

export const userListRequestSchema = yup
  .object({
    country: yup.string().trim().min(1, "country cannot br null"),
    city: yup.string().trim().min(1, "city cannot br null"),
  })
  .required();

export type userListRequest = yup.InferType<typeof userListRequestSchema>;

export interface userDBSchema extends userProfileSetRequest {
  twitter: userInfo;
  bookshelf: Array<bookDBSchema>;
}
