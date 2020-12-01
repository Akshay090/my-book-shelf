import * as yup from "yup";

export const dummySchema = yup
  .object({
    dummyData: yup
      .string()
      .trim()
      .min(1, "dummyData cannot be null")
      .required(),
  })
  .required();

export type dummyType = yup.InferType<typeof dummySchema>;
