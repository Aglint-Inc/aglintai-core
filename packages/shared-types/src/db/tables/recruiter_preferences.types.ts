// import { ATSIntegrations } from "../common.types";
import type { TableType } from "./index.types";

export type CustomRecruiterPreferences = TableType<
  "recruiter_preferences",
  {
    greenhouse: boolean;
  }
>;
