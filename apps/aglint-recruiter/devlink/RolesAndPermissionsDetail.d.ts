import * as React from "react";
import * as Types from "./types";

declare function RolesAndPermissionsDetail(props: {
  as?: React.ElementType;
  slotPermissions?: Types.Devlink.Slot;
  textTotalEnabledPermissions?: React.ReactNode;
  slotUserWithRole?: Types.Devlink.Slot;
  slotBackButton?: Types.Devlink.Slot;
  textUserCount?: React.ReactNode;
  textRoleName?: React.ReactNode;
  textUserDescription?: React.ReactNode;
  slotBanner?: Types.Devlink.Slot;
  slotAddButton?: Types.Devlink.Slot;
}): React.JSX.Element;
