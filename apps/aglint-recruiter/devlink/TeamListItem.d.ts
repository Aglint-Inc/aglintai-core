import * as React from "react";
import * as Types from "./types";

declare function TeamListItem(props: {
  as?: React.ElementType;
  slotUserRole?: Types.Devlink.Slot;
  userName?: React.ReactNode;
  userEmail?: React.ReactNode;
  slotProfileImage?: Types.Devlink.Slot;
  textDepartment?: React.ReactNode;
  textDesignation?: React.ReactNode;
  textLocation?: React.ReactNode;
  textLastActive?: React.ReactNode;
  slotThreeDot?: Types.Devlink.Slot;
  slotBadge?: Types.Devlink.Slot;
}): React.JSX.Element;
