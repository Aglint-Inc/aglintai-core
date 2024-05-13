import * as React from "react";
import * as Types from "./types";

declare function FeedbackCandidate(props: {
  as?: React.ElementType;
  slotLogo?: Types.Devlink.Slot;
  onClickVerySatisfy?: Types.Devlink.RuntimeProps;
  onClickSatisfy?: Types.Devlink.RuntimeProps;
  onClickNeutral?: Types.Devlink.RuntimeProps;
  onClickNotSatisfied?: Types.Devlink.RuntimeProps;
  isVerySatisfiedActive?: Types.Visibility.VisibilityConditions;
  isSatisfiedActive?: Types.Visibility.VisibilityConditions;
  isNeutralActive?: Types.Visibility.VisibilityConditions;
  isNotSatisfiedActive?: Types.Visibility.VisibilityConditions;
  slotFeedbackInput?: Types.Devlink.Slot;
  onClickSubmit?: Types.Devlink.RuntimeProps;
  isRatingVisible?: Types.Visibility.VisibilityConditions;
  isThankYouVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
