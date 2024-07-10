import * as React from "react";
import * as Types from "./types";

declare function UserWithRole(props: {
  as?: React.ElementType;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  slotAvatar?: Types.Devlink.Slot;
  slotBadge?: Types.Devlink.Slot;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
