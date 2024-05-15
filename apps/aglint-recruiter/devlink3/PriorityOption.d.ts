import * as React from "react";
import * as Types from "./types";

declare function PriorityOption(props: {
  as?: React.ElementType;
  onClickHigh?: Types.Devlink.RuntimeProps;
  onClickMedium?: Types.Devlink.RuntimeProps;
  onClickLow?: Types.Devlink.RuntimeProps;
  textScheduleHigh?: React.ReactNode;
  textScheduleMedium?: React.ReactNode;
  textScheduleLow?: React.ReactNode;
}): React.JSX.Element;
