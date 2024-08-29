import * as React from "react";
import * as Types from "./types";

declare function ScheduleInterviewPop(props: {
  as?: React.ElementType;
  textName?: React.ReactNode;
  textSelectedSchedule?: React.ReactNode;
  slotStagePill?: Types.Devlink.Slot;
  slotRequestOption?: Types.Devlink.Slot;
  slotAssignedInput?: Types.Devlink.Slot;
  slotPickDateInput?: Types.Devlink.Slot;
  isRequestTypeVisible?: Types.Visibility.VisibilityConditions;
  isCandidateVisible?: Types.Visibility.VisibilityConditions;
  slotNotes?: Types.Devlink.Slot;
}): React.JSX.Element;
