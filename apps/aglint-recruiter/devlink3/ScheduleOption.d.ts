import * as React from "react";
import * as Types from "./types";

declare function ScheduleOption(props: {
  as?: React.ElementType;
  isSelected?: Types.Visibility.VisibilityConditions;
  isCheckbox?: Types.Visibility.VisibilityConditions;
  slotSingleDaySchedule?: Types.Devlink.Slot;
  isCheckboxAndRadio?: Types.Visibility.VisibilityConditions;
  slotCheckbox?: Types.Devlink.Slot;
}): React.JSX.Element;
