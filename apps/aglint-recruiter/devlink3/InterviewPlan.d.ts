import * as React from "react";
import * as Types from "./types";

declare function InterviewPlan(props: {
  as?: React.ElementType;
  slotInterviewPlan?: Types.Devlink.Slot;
  onClickAddModule?: Types.Devlink.RuntimeProps;
  onClickAddBreak?: Types.Devlink.RuntimeProps;
  onClickScheduler?: Types.Devlink.RuntimeProps;
  slotInterviewCoordinator?: Types.Devlink.Slot;
  slotPrimaryButton?: Types.Devlink.Slot;
  isEmptyVisible?: Types.Visibility.VisibilityConditions;
  isCoordinatorVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
