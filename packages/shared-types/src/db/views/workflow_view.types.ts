import { ViewType } from "./index.types";

export type CustomWorkflowView = ViewType<
  "workflow_view",
  {
    jobs: string[];
  }
>;
