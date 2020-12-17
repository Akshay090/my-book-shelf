import * as yup from "yup";

export const userProfileSchema = yup
  .object({
    profile: yup.object(),
    description: yup.string().trim().max(140, "max description len 140"),
    city: yup.string().trim().max(189, "no large city"),
    country: yup.string().trim().max(90, "no large country"),
  })
  .required();

export type userProfile = yup.InferType<typeof userProfileSchema>;
