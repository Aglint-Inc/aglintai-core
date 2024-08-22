import * as React from "react";
import * as Types from "./types";

declare function RolesPill(props: {
  as?: React.ElementType;
  textRoles?: React.ReactNode;
  onClickRemoveRoles?: Types.Devlink.RuntimeProps;
  isCloseIconVisible?: Types.Visibility.VisibilityConditions;
  slotLeftIcon?: Types.Devlink.Slot;
  isLeftIconVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
