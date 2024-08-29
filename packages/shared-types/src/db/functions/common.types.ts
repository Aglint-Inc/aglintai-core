import { CustomRequestType } from "../common.types";
import { Database } from "../schema.types";

export type CustomRequestPayload = Required<
  Pick<
    CustomRequestType,
    | "assignee_id"
    | "assigner_id"
    | "type"
    | "title"
    | "status"
    | "priority"
    | "schedule_end_date"
    | "schedule_start_date"
  > &
    Pick<Database["public"]["Tables"]["request_note"]["Row"], "note">
>;
