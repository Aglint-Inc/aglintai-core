import * as React from "react";
import * as Types from "./types";

declare function SchedulerFilters(props: {
  as?: React.ElementType;
  textNumberNoConflicts?: React.ReactNode;
  textNumberSoftConflicts?: React.ReactNode;
  textNumberHardConflicts?: React.ReactNode;
  textNumberOutsideWorkHours?: React.ReactNode;
  slotPreferedInterviewersSearch?: Types.Devlink.Slot;
  slotTimeRangeSelector?: Types.Devlink.Slot;
  slotCheckbox?: Types.Devlink.Slot;
  textDateRange?: React.ReactNode;
  slotSoftConflictToggle?: Types.Devlink.Slot;
  slotNoConflictToggle?: Types.Devlink.Slot;
  slotHardConflictToggle?: Types.Devlink.Slot;
  slotOutsideToggle?: Types.Devlink.Slot;
  isNoConflictActive?: Types.Visibility.VisibilityConditions;
  isSoftConflictActive?: Types.Visibility.VisibilityConditions;
  isHardConflictActive?: Types.Visibility.VisibilityConditions;
  isOutsideActive?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
