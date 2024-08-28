import * as React from "react";
import * as Types from "./types";

declare function TeamUsersList(props: {
  as?: React.ElementType;
  slotTeamList?: Types.Devlink.Slot;
  pendInvitesVisibility?: Types.Visibility.VisibilityConditions;
  slotPendingInviteBtn?: Types.Devlink.Slot;
  slotInviteBtn?: Types.Devlink.Slot;
  slotUsersRoleList?: Types.Devlink.Slot;
  onClickViewPendingInvites?: Types.Devlink.RuntimeProps;
  textPending?: React.ReactNode;
  slotSearchAndFilter?: Types.Devlink.Slot;
  slotBanner?: Types.Devlink.Slot;
  slotFilterRight?: Types.Devlink.Slot;
}): React.JSX.Element;
