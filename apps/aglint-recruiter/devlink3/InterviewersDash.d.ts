import * as React from "react";
import * as Types from "./types";

declare function InterviewersDash(props: {
  as?: React.ElementType;
  slotInterviewersCardList?: Types.Devlink.Slot;
  onClickQualified?: Types.Devlink.RuntimeProps;
  onClickTrainee?: Types.Devlink.RuntimeProps;
  isQualifiedActive?: Types.Visibility.VisibilityConditions;
  isTraineeActive?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
