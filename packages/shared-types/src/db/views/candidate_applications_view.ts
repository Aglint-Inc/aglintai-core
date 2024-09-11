import type { CustomApplicationStatus } from "../common.types";
import type { ViewType } from "./index.types";

export type CustomCandidateApplicationView = ViewType<
  "candidate_applications_view",
  {
    application_status: CustomApplicationStatus;
  }
>;
