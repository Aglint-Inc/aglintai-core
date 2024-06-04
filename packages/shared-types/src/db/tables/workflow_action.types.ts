import type { CustomEmailTemplate } from "./common.types";
import type { TableType } from "./index.types";

export type CustomWorkflowAction = TableType<
  "workflow_action",
  {
    payload: CustomPayload;
  }
>;

type CustomPayload = {
  key: keyof CustomEmailTemplate;
  template: CustomEmailTemplate["application_received"];
};
