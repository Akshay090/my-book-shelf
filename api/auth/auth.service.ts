import { errors } from "../error/error.constants";
import { dummyType } from "./auth.schema";
export const dummyService = async (input: dummyType): Promise<boolean> => {
  if (input.dummyData === "test") return true;
  else throw errors.DUMMY_ERROR;
};
