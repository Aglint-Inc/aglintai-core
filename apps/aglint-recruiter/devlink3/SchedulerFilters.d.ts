import * as React from "react";
import * as Types from "./types";

declare function SchedulerFilters(props: {
  as?: React.ElementType;
  slotPreferedInterviewersSearch?: Types.Devlink.Slot;
  slotTimeRangeSelector?: Types.Devlink.Slot;
  slotCheckbox?: Types.Devlink.Slot;
  textDateRange?: React.ReactNode;
  slotNoConflictToggle?: Types.Devlink.Slot;
  slotSchedulerConflictCard?: Types.Devlink.Slot;
  showWorkloadPreference?: Types.Visibility.VisibilityConditions;
  textMembers?: React.ReactNode;
}): React.JSX.Element;
