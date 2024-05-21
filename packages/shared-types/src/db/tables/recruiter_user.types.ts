import { CustomSchedulingSettings } from "./common.types";
import { TableType } from "./index.types";
import { CustomRecruiter } from "./recruiter.types";

export type CustomRecruiterUser = TableType<
  "recruiter_user",
  { scheduling_settings: CustomSchedulingSettings }
>;
