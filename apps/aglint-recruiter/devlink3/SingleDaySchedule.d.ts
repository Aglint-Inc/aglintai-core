import * as React from "react";
import * as Types from "./types";

declare function SingleDaySchedule(props: {
  as?: React.ElementType;
  textTotalTimeRange?: React.ReactNode;
  slotConflicts?: Types.Devlink.Slot;
  slotSessionDetails?: Types.Devlink.Slot;
  textDayCount?: React.ReactNode;
  textDate?: React.ReactNode;
  isMultiDay?: Types.Visibility.VisibilityConditions;
  onClickSingleDay?: Types.Devlink.RuntimeProps;
  rotateArrow?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
