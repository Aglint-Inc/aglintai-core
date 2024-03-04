import * as React from "react";
import * as Types from "./types";

declare function InterviewMemberSide(props: {
  as?: React.ElementType;
  isAllActive?: Types.Visibility.VisibilityConditions;
  isUpcomingActive?: Types.Visibility.VisibilityConditions;
  isCompletedActive?: Types.Visibility.VisibilityConditions;
  isNotConfirmedActive?: Types.Visibility.VisibilityConditions;
  slotInterviewCard?: Types.Devlink.Slot;
  onClickAll?: Types.Devlink.RuntimeProps;
  onClickUpcoming?: Types.Devlink.RuntimeProps;
  onClickCompleted?: Types.Devlink.RuntimeProps;
  onClickNotConfirmed?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
