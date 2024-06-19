import type { ViewType } from "./index.types";

export type CustomWorkflowView = ViewType<
  "workflow_view",
  {
    jobs: { job_id: string; title: string }[];
  }
>;
