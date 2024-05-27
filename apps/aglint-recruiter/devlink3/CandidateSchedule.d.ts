import * as React from "react";
import * as Types from "./types";

declare function CandidateSchedule(props: {
  as?: React.ElementType;
  slotDarkPill?: Types.Devlink.Slot;
  slotFullScheduleCard?: Types.Devlink.Slot;
  slotCandidateCard?: Types.Devlink.Slot;
  slotScheduleNowButton?: Types.Devlink.Slot;
  isScheduleNowVisible?: Types.Visibility.VisibilityConditions;
  onClickClose?: Types.Devlink.RuntimeProps;
  onClickPhoneAgent?: Types.Devlink.RuntimeProps;
  onClickMailAgent?: Types.Devlink.RuntimeProps;
  onClickRequestAvailability?: Types.Devlink.RuntimeProps;
  onClickSelfschedulingLink?: Types.Devlink.RuntimeProps;
  onClickDebrief?: Types.Devlink.RuntimeProps;
  isSelfScheduleButton?: Types.Visibility.VisibilityConditions;
  isRequestAvailabilityButton?: Types.Visibility.VisibilityConditions;
  isScheduleDebriefButton?: Types.Visibility.VisibilityConditions;
  isScheduleAgentButton?: Types.Visibility.VisibilityConditions;
  isPhoneAgent?: Types.Visibility.VisibilityConditions;
  isMailAgent?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
