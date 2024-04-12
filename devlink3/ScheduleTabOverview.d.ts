import * as React from "react";
import * as Types from "./types";

declare function ScheduleTabOverview(props: {
  as?: React.ElementType;
  slotAvatarWithName?: Types.Devlink.Slot;
  slotCandidateCard?: Types.Devlink.Slot;
  slotRelatedJobCard?: Types.Devlink.Slot;
  slotScheduleCard?: Types.Devlink.Slot;
  slotJoinMeetingButton?: Types.Devlink.Slot;
  onClickCopyLink?: Types.Devlink.RuntimeProps;
  textMeetingLink?: React.ReactNode;
  slotStatus?: Types.Devlink.Slot;
  textSchedule?: React.ReactNode;
  onClickInterviewModuleLink?: Types.Devlink.RuntimeProps;
  slotInterviewers?: Types.Devlink.Slot;
  slotTrainees?: Types.Devlink.Slot;
  slotCoordinators?: Types.Devlink.Slot;
  isCoordinatorVisible?: Types.Visibility.VisibilityConditions;
  isTraineesVisible?: Types.Visibility.VisibilityConditions;
  isInterviewersVisible?: Types.Visibility.VisibilityConditions;
  textInterviewModuleLink?: React.ReactNode;
  onClickReschedule?: Types.Devlink.RuntimeProps;
  onClickCancelSchedule?: Types.Devlink.RuntimeProps;
  isScheduleLinkVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
