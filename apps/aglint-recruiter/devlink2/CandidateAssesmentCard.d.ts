import * as React from "react";
import * as Types from "./types";

declare function CandidateAssesmentCard(props: {
  as?: React.ElementType;
  slotLogo?: Types.Devlink.Slot;
  textQuestionCount?: React.ReactNode;
  textDuration?: React.ReactNode;
  onClickStart?: Types.Devlink.RuntimeProps;
  textHeader?: React.ReactNode;
  onClickSubmitted?: Types.Devlink.RuntimeProps;
  isSubmittedVisible?: Types.Visibility.VisibilityConditions;
  isStartButtonVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
