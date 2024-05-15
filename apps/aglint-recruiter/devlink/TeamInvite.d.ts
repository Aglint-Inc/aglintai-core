import * as React from "react";
import * as Types from "./types";

declare function TeamInvite(props: {
  as?: React.ElementType;
  slotForm?: Types.Devlink.Slot;
  slotButtons?: Types.Devlink.Slot;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotInviteTeamCard?: Types.Devlink.Slot;
  isInviteTeamCardVisible?: Types.Visibility.VisibilityConditions;
  isInviteSentVisible?: Types.Visibility.VisibilityConditions;
  textTitle?: React.ReactNode;
  isFixedButtonVisible?: Types.Visibility.VisibilityConditions;
  slotPrimaryButton?: Types.Devlink.Slot;
}): React.JSX.Element;
