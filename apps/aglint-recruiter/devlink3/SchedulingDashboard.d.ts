import * as React from "react";
import * as Types from "./types";

declare function SchedulingDashboard(props: {
  as?: React.ElementType;
  slotFirstGrid?: Types.Devlink.Slot;
  slotScheduleCount?: Types.Devlink.Slot;
  slotsCradsWithNumber?: Types.Devlink.Slot;
  slotRecentReschedule?: Types.Devlink.Slot;
  slotCompletedInterview?: Types.Devlink.Slot;
  slotTimeToSchedule?: Types.Devlink.Slot;
  slotCandidateSatisfactionRate?: Types.Devlink.Slot;
  slotDeclineRequest?: Types.Devlink.Slot;
  slotFilters?: Types.Devlink.Slot;
  slotQuickLinks?: Types.Devlink.Slot;
}): React.JSX.Element;
