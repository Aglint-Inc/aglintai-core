import * as React from "react";
import * as Types from "./types";

declare function ScheduleInfoConfirmed(props: {
  as?: React.ElementType;
  slotScheduleInfoCard?: Types.Devlink.Slot;
  slotProfileImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textCurrentRole?: React.ReactNode;
  textLocation?: React.ReactNode;
  onClickViewProfile?: Types.Devlink.RuntimeProps;
  onClickReschedule?: Types.Devlink.RuntimeProps;
  onClickCancel?: Types.Devlink.RuntimeProps;
  isInterviewPlanVisible?: Types.Visibility.VisibilityConditions;
  slotInterviewPlan?: Types.Devlink.Slot;
  isScheduleStatusVisible?: Types.Visibility.VisibilityConditions;
  textCompleted?: React.ReactNode;
  isScheduleCompletedVisible?: Types.Visibility.VisibilityConditions;
  textScheduleCancelled?: React.ReactNode;
  isScheduleCancelVisible?: Types.Visibility.VisibilityConditions;
  isScheduleInfoVisible?: Types.Visibility.VisibilityConditions;
  slotAvatarWithName?: Types.Devlink.Slot;
  textEmail?: React.ReactNode;
  onClickResendInvite?: Types.Devlink.RuntimeProps;
  copyInviteLink?: Types.Devlink.RuntimeProps;
  textRole?: React.ReactNode;
  isInviteLinkVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
