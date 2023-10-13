import * as React from "react";
import * as Types from "./types";

declare function ToggleSelectDropdown(props: {
  as?: React.ElementType;
  dropdownTitle?: React.ReactNode;
  isSchedule?: Types.Visibility.VisibilityConditions;
  isNotSchedule?: Types.Visibility.VisibilityConditions;
  statusText?: React.ReactNode;
  slotSelection?: Types.Devlink.Slot;
  statusProps?: Types.Devlink.RuntimeProps;
  isSourcing?: Types.Visibility.VisibilityConditions;
  isInterviewing?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
