import * as React from "react";
import * as Types from "./types";

declare function ScheduleOption(props: {
  as?: React.ElementType;
  textTotalTimeRange?: React.ReactNode;
  slotConflicts?: Types.Devlink.Slot;
  isSelected?: Types.Visibility.VisibilityConditions;
  isCheckbox?: Types.Visibility.VisibilityConditions;
  isRadio?: Types.Visibility.VisibilityConditions;
  slotSessionDetails?: Types.Devlink.Slot;
  onClickSelect?: Types.Devlink.RuntimeProps;
  slotSingleDaySchedule?: Types.Devlink.Slot;
  isCheckboxAndRadio?: Types.Visibility.VisibilityConditions;
  slotCheckbox?: Types.Devlink.Slot;
}): React.JSX.Element;
