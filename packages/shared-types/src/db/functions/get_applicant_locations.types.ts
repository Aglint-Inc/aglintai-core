import { Database } from "../schema.types";
import type { FunctionType } from "./index.types";

export type CustomGetApplicantLocations = FunctionType<
  "get_applicant_locations",
  {},
  {
    locations: { [id: string]: { [id: string]: string[] } };
  }
>;
