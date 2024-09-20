import type { ValidWorkflowActionEntries } from "../..";
import type { TableType } from "./index.types";

export type CustomWorkflowAction = TableType<
  "workflow_action",
  ValidWorkflowActionEntries
>;
