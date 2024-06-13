import * as React from "react";
import * as Types from "./types";

declare function MembersList(props: {
  as?: React.ElementType;
  slotImage?: Types.Devlink.Slot;
  isShadow?: Types.Visibility.VisibilityConditions;
  isReverseShadow?: Types.Visibility.VisibilityConditions;
  textName?: React.ReactNode;
  textDesignation?: React.ReactNode;
  textTime?: React.ReactNode;
  isButtonVisible?: Types.Visibility.VisibilityConditions;
  onClickResendInvite?: Types.Devlink.RuntimeProps;
  onClickCopyInvite?: Types.Devlink.RuntimeProps;
  isDesignationVisible?: Types.Visibility.VisibilityConditions;
  isDetailVisible?: Types.Visibility.VisibilityConditions;
  onClickAccept?: Types.Devlink.RuntimeProps;
  onClickDecline?: Types.Devlink.RuntimeProps;
  isAcceptVisible?: Types.Visibility.VisibilityConditions;
  isDeclineVisible?: Types.Visibility.VisibilityConditions;
  isAcceptDeclineVisibe?: Types.Visibility.VisibilityConditions;
  slotMemberDetail?: Types.Devlink.Slot;
  slotIcon?: Types.Devlink.Slot;
}): React.JSX.Element;
