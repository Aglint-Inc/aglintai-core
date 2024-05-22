import { CustomMembersMeta } from "../common.types";
import { FunctionType } from "./index.types";

export type CustomInsertDebriefSession = FunctionType<
  "insert_debrief_session",
  { members: { id: string }[]; members_meta: CustomMembersMeta },
  {}
>;
