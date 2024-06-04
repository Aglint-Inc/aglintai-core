import type { CustomApplicationBadges } from "../common.types";
import type { ViewType } from "./index.types";

export type CustomApplicationView = ViewType<
  "application_view",
  {
    badges: CustomApplicationBadges;
  }
>;
