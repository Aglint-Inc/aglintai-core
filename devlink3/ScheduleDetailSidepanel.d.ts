import * as React from "react";
import * as Types from "./types";

declare function ScheduleDetailSidepanel(props: {
  as?: React.ElementType;
  slotScheduleCard?: Types.Devlink.Slot;
  onClickJoinMeet?: Types.Devlink.RuntimeProps;
  onClickCopy?: Types.Devlink.RuntimeProps;
  slotCandidateCard?: Types.Devlink.Slot;
  slotRelatedJobCard?: Types.Devlink.Slot;
  onClickReschedule?: Types.Devlink.RuntimeProps;
  onClickCancelSchedule?: Types.Devlink.RuntimeProps;
  textScheduleConfirmed?: React.ReactNode;
  slotStatusPill?: Types.Devlink.Slot;
  slotInterviewPlanCard?: Types.Devlink.Slot;
  slotAvatarWithName?: Types.Devlink.Slot;
  textUrl?: React.ReactNode;
  isCandidateInfoVisible?: Types.Visibility.VisibilityConditions;
  isJobVisible?: Types.Visibility.VisibilityConditions;
  isJoinLinkVisible?: Types.Visibility.VisibilityConditions;
  isScheduleButtonVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
