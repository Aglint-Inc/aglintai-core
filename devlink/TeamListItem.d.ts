import * as React from "react";
import * as Types from "./types";

declare function TeamListItem(props: {
  as?: React.ElementType;
  slotUserRole?: Types.Devlink.Slot;
  userStatusProps?: Types.Devlink.RuntimeProps;
  userStatusText?: React.ReactNode;
  dateText?: React.ReactNode;
  onClickRemove?: Types.Devlink.RuntimeProps;
  userName?: React.ReactNode;
  userEmail?: React.ReactNode;
  slotProfileImage?: Types.Devlink.Slot;
  isDeleteVisible?: Types.Visibility.VisibilityConditions;
  isDeleteDisable?: Types.Visibility.VisibilityConditions;
  onClickCancelInvite?: Types.Devlink.RuntimeProps;
  isCancelInviteVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
