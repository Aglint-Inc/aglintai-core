import * as React from "react";
import * as Types from "./types";

declare function OpenInvitationLink(props: {
  as?: React.ElementType;
  textDesc?: React.ReactNode;
  slotInviteLinkCard?: Types.Devlink.Slot;
  onClickAskOptions?: Types.Devlink.RuntimeProps;
  slotButtonPrimary?: Types.Devlink.Slot;
  isNotFindingTextVisible?: Types.Visibility.VisibilityConditions;
  slotCompanyLogo?: Types.Devlink.Slot;
  slotTimeFixer?: Types.Devlink.Slot;
  isSelected?: Types.Visibility.VisibilityConditions;
  slotDatePill?: Types.Devlink.Slot;
  slotDaysPill?: Types.Devlink.Slot;
}): React.JSX.Element;
