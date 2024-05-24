import * as React from "react";
import * as Types from "./types";

declare function SingleDaySchedule(props: {
  as?: React.ElementType;
  textTotalTimeRange?: React.ReactNode;
  slotConflicts?: Types.Devlink.Slot;
  slotSessionDetails?: Types.Devlink.Slot;
  isSelected?: Types.Visibility.VisibilityConditions;
  textDayCount?: React.ReactNode;
  textDate?: React.ReactNode;
  isMultiDay?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
