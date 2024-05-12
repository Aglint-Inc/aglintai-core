import * as React from "react";
import * as Types from "./types";

declare function CandidateQuestionLayout(props: {
  as?: React.ElementType;
  slotQuestionProgress?: Types.Devlink.Slot;
  textTotalQuestion?: React.ReactNode;
  textTitle?: React.ReactNode;
  onClickPrevious?: Types.Devlink.RuntimeProps;
  onClickNext?: Types.Devlink.RuntimeProps;
  slotCandidateQuestion?: Types.Devlink.Slot;
  isNextButtonVisible?: Types.Visibility.VisibilityConditions;
  isSubmitButtonVisible?: Types.Visibility.VisibilityConditions;
  onClickSubmit?: Types.Devlink.RuntimeProps;
  slotTime?: Types.Devlink.Slot;
  isNextDisable?: Types.Visibility.VisibilityConditions;
  isTimeVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
