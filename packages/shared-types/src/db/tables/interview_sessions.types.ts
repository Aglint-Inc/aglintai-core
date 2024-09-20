import type { CustomMembersMeta } from "../common.types";
import type { TableType } from "./index.types";

export type CustomInterviewSession = TableType<
  "interview_session",
  { members_meta: CustomMembersMeta }
>;
