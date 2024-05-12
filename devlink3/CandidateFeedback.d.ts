import * as React from "react";
import * as Types from "./types";

declare function CandidateFeedback(props: {
  as?: React.ElementType;
  slotEmoji?: Types.Devlink.Slot;
  textSatisfactionLevel?: React.ReactNode;
  textAdditionalFeedback?: React.ReactNode;
  onClickReqFeedback?: Types.Devlink.RuntimeProps;
  isFeedbackNotSubmitted?: Types.Visibility.VisibilityConditions;
  isFeedbackSubmitted?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
