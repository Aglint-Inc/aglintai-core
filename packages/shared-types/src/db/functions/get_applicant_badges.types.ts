import { CustomApplicationBadges } from "../common.types";
import { Database } from "../schema.types";
import { Custom } from "../utils.types";
import type { FunctionType } from "./index.types";

export type CustomGetApplicantBadges = FunctionType<
  "get_applicant_badges",
  Custom<
    Database["public"]["Functions"]["get_applicant_badges"]["Args"],
    { badge_constants?: CustomApplicationBadges }
  >,
  CustomApplicationBadges
>;
