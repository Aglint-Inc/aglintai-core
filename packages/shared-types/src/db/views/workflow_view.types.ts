import { Database } from "../schema.types";
import type { ViewType } from "./index.types";

export type CustomWorkflowView = ViewType<
  "workflow_view",
  {
    jobs: Pick<
      Database["public"]["Tables"]["public_jobs"]["Row"],
      "id" | "job_title" | "department" | "location" | "status"
    >[];
  }
>;
