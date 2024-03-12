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
  onClickAll?: Types.Devlink.RuntimeProps;
  isAllActive?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
