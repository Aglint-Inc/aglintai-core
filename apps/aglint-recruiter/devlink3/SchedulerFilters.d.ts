import * as React from "react";
import * as Types from "./types";

declare function SchedulerFilters(props: {
  as?: React.ElementType;
  textNumberNoConflicts?: React.ReactNode;
  textNumberSoftConflicts?: React.ReactNode;
  textNumberHardConflicts?: React.ReactNode;
  textNumberOutsideWorkHours?: React.ReactNode;
  slotSuggestionControlTooltip?: Types.Devlink.Slot;
  slotPreferedInterviewersSearch?: Types.Devlink.Slot;
  slotTimeRangeSearch?: Types.Devlink.Slot;
  slotCheckbox?: Types.Devlink.Slot;
  textDateRange?: React.ReactNode;
}): React.JSX.Element;
