import * as React from "react";
import * as Types from "./types";

declare function SchedulerFilters(props: {
  as?: React.ElementType;
  textDateRange?: React.ReactNode;
  onClickEditDateRange?: Types.Devlink.RuntimeProps;
  textNumberNoConflicts?: React.ReactNode;
  textNumberSoftConflicts?: React.ReactNode;
  textNumberHardConflicts?: React.ReactNode;
  textNumberOutsideWorkHours?: React.ReactNode;
  slotSuggestionControlTooltip?: Types.Devlink.Slot;
  slotPreferedInterviewers?: Types.Devlink.Slot;
  slotPreferedInterviewersSearch?: Types.Devlink.Slot;
  slotPreferedTimeRanges?: Types.Devlink.Slot;
  slotTimeRangeSearch?: Types.Devlink.Slot;
  slotCheckbox?: Types.Devlink.Slot;
}): React.JSX.Element;
