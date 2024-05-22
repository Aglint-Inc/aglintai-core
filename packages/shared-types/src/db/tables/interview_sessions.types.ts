import { CustomMembersMeta } from "../common.types";
import { TableType } from "./index.types";

export type CustomInterviewSession = TableType<
  "interview_session",
  { members_meta: CustomMembersMeta }
>;
