import * as React from "react";
import * as Types from "./types";

declare function ScheduleInterview(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  onClickContinue?: Types.Devlink.RuntimeProps;
  isContinueDisable?: Types.Visibility.VisibilityConditions;
  slotScheduleInterviewFill?: Types.Devlink.Slot;
  isContinueVisible?: Types.Visibility.VisibilityConditions;
  isInviteCandidateButtonVisible?: Types.Visibility.VisibilityConditions;
  onClickBack?: Types.Devlink.RuntimeProps;
  isInviteCandidateDisable?: Types.Visibility.VisibilityConditions;
  onClickInviteCandidate?: Types.Devlink.RuntimeProps;
  isCloseButtonVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
