import type { TableType } from "./index.types";

export type CustomTour = TableType<
  "tour",
  {
    type: CustomTourType;
  }
>;

type CustomTourType = "workflow_tip";
