import * as React from "react";
import * as Types from "./types";

declare function InterviewerScreens(props: {
  as?: React.ElementType;
  onClickAll?: Types.Devlink.RuntimeProps;
  isAllActive?: Types.Visibility.VisibilityConditions;
  onClickUpcoming?: Types.Devlink.RuntimeProps;
  isUpcomingActive?: Types.Visibility.VisibilityConditions;
  onClickCompleted?: Types.Devlink.RuntimeProps;
  isCompletedActive?: Types.Visibility.VisibilityConditions;
  slotInterviewScreenCard?: Types.Devlink.Slot;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickScheduling?: Types.Devlink.RuntimeProps;
  isSchedulingActive?: Types.Visibility.VisibilityConditions;
  isCancelActive?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
