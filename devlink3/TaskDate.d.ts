import * as React from "react";
import * as Types from "./types";

declare function TaskDate(props: {
  as?: React.ElementType;
  onClickSpecificDate?: Types.Devlink.RuntimeProps;
  isSpecificDateActive?: Types.Visibility.VisibilityConditions;
  onClickInDateRange?: Types.Devlink.RuntimeProps;
  isInDateRangeActive?: Types.Visibility.VisibilityConditions;
  slotDate?: Types.Devlink.Slot;
  textButton1?: React.ReactNode;
  textButton2?: React.ReactNode;
}): React.JSX.Element;
