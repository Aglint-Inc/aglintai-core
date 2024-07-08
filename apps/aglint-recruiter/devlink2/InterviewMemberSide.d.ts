import * as React from "react";
import * as Types from "./types";

declare function InterviewMemberSide(props: {
  as?: React.ElementType;
  isUpcomingActive?: Types.Visibility.VisibilityConditions;
  isCompletedActive?: Types.Visibility.VisibilityConditions;
  slotInterviewCard?: Types.Devlink.Slot;
  onClickUpcoming?: Types.Devlink.RuntimeProps;
  onClickCompleted?: Types.Devlink.RuntimeProps;
  onClickCancelled?: Types.Devlink.RuntimeProps;
  isCancelActive?: Types.Visibility.VisibilityConditions;
  propsGrids?: Types.Devlink.RuntimeProps;
  slotInterview?: Types.Devlink.Slot;
  onClickWaiting?: Types.Devlink.RuntimeProps;
  isWaitingActive?: Types.Visibility.VisibilityConditions;
  textUpcomingCount?: React.ReactNode;
  textCancelledCount?: React.ReactNode;
  textPastCount?: React.ReactNode;
}): React.JSX.Element;
