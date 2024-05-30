import { CustomEmailTemplate, CustomSchedulingSettings } from "./common.types";
import { TableType } from "./index.types";

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
