import * as React from "react";
import * as Types from "./types";

declare function ScheduleTabOverview(props: {
  as?: React.ElementType;
  slotCandidateCard?: Types.Devlink.Slot;
  slotScheduleCard?: Types.Devlink.Slot;
  slotJoinMeetingButton?: Types.Devlink.Slot;
  onClickCopyLink?: Types.Devlink.RuntimeProps;
  textMeetingLink?: React.ReactNode;
  slotStatus?: Types.Devlink.Slot;
  textSchedule?: React.ReactNode;
  onClickInterviewModuleLink?: Types.Devlink.RuntimeProps;
  isInterviewersVisible?: Types.Visibility.VisibilityConditions;
  textInterviewModuleLink?: React.ReactNode;
  onClickReschedule?: Types.Devlink.RuntimeProps;
  onClickCancelSchedule?: Types.Devlink.RuntimeProps;
  isScheduleLinkVisible?: Types.Visibility.VisibilityConditions;
  slotRescheduleCard?: Types.Devlink.Slot;
  slotCandidate?: Types.Devlink.Slot;
  slotMembers?: Types.Devlink.Slot;
  isMembersVisible?: Types.Visibility.VisibilityConditions;
  isScheduleCardVisible?: Types.Visibility.VisibilityConditions;
  isMeetingLinkVisible?: Types.Visibility.VisibilityConditions;
  slotHeaderWithSlot?: Types.Devlink.Slot;
}): React.JSX.Element;
