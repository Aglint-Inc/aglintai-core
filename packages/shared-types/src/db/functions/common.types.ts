import { CustomRequestType } from "../common.types";

export type CustomRequestPayload = Required<
  Pick<CustomRequestType, "assignee_id" | "assigner_id" | "type" | "title">
>;
