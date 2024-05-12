import * as React from "react";
import * as Types from "./types";

declare function RoleList(props: {
  as?: React.ElementType;
  slotImage?: Types.Devlink.Slot;
  textRoleHeader?: React.ReactNode;
  textName?: React.ReactNode;
  textDesignation?: React.ReactNode;
}): React.JSX.Element;
