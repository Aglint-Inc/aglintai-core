import * as React from "react";
import * as Types from "./types";

declare function ScheduleInfoConfirmed(props: {
  as?: React.ElementType;
  slotScheduleInfoCard?: Types.Devlink.Slot;
  slotProfileImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  textLocation?: React.ReactNode;
  onClickViewProfile?: Types.Devlink.RuntimeProps;
  onClickReschedule?: Types.Devlink.RuntimeProps;
  onClickCancel?: Types.Devlink.RuntimeProps;
  isInterviewPlanVisible?: Types.Visibility.VisibilityConditions;
  slotInterviewPlan?: Types.Devlink.Slot;
  isScheduleStatusVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
