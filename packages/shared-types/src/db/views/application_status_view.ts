import type { CustomApplicationStatus } from "../common.types";
import type { ViewType } from "./index.types";

export type CustomApplicationStatusView = ViewType<
  "application_status_view",
  {
    status: CustomApplicationStatus;
  }
>;
