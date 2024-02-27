import * as React from "react";
import * as Types from "./types";

declare function InvitedCards(props: {
  as?: React.ElementType;
  textTitle?: React.ReactNode;
  textQuestionCount?: React.ReactNode;
  slotInviteStatus?: Types.Devlink.Slot;
  textDesc?: React.ReactNode;
  onClickResendInvite?: Types.Devlink.RuntimeProps;
  onClickInviteLink?: Types.Devlink.RuntimeProps;
  onClickInviteNow?: Types.Devlink.RuntimeProps;
  isInviteNowVisible?: Types.Visibility.VisibilityConditions;
  isResendInviteVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
