import * as React from "react";
import * as Types from "./types";

declare function SchedulerFilters(props: {
  as?: React.ElementType;
  singleDaySchedule?: Types.Devlink.Slot;
  slotPreferdInterviewerInput?: Types.Devlink.Slot;
  slotSelectedTimeRanges?: Types.Devlink.Slot;
  slotSelectedTiimeRangeInput?: Types.Devlink.Slot;
  slotWorkloadPreference?: Types.Devlink.Slot;
  slotToggleWithText?: Types.Devlink.Slot;
  textNoConflicts?: React.ReactNode;
  onClickChangeDate?: Types.Devlink.RuntimeProps;
  textSoftConflicts?: React.ReactNode;
  textHardConflicts?: React.ReactNode;
  textOutsideWorkHours?: React.ReactNode;
}): React.JSX.Element;
