import * as React from "react";
import * as Types from "./types";

declare function FeedbackViewPopup(props: {
  as?: React.ElementType;
  slotAvatarWithName?: Types.Devlink.Slot;
  onClickClose?: Types.Devlink.RuntimeProps;
  textRecomendation?: React.ReactNode;
  textObjective?: React.ReactNode;
  onClickNext?: Types.Devlink.RuntimeProps;
  onClickPrev?: Types.Devlink.RuntimeProps;
  onClickEditFeedback?: Types.Devlink.RuntimeProps;
  isEditFeedbackVisible?: Types.Visibility.VisibilityConditions;
  textEditFeedback?: React.ReactNode;
  isNextPrevVisible?: Types.Visibility.VisibilityConditions;
  isNotSubmittedVisible?: Types.Visibility.VisibilityConditions;
  onClickRequestFeedback?: Types.Devlink.RuntimeProps;
  isEmpty?: Types.Visibility.VisibilityConditions;
  onClickResendRequest?: Types.Devlink.RuntimeProps;
  isFeedbackReqVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
