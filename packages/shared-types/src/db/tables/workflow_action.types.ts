import { Database } from "../schema.types";
import { TableType } from "./index.types";

export type CustomWorkflowAction = TableType<
  "workflow_action",
  {
    payload: CustomPayload;
  }
>;

type CustomPayload = Pick<
  Database["public"]["Tables"]["company_email_template"]["Row"],
  "subject" | "body"
>;
