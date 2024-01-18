import * as React from "react";
import * as Types from "./types";

declare function SublinkSubMenu(props: {
  as?: React.ElementType;
  textLink?: React.ReactNode;
  slotSubMenu?: Types.Devlink.Slot;
  isActive?: Types.Visibility.VisibilityConditions;
  isMuted?: Types.Visibility.VisibilityConditions;
  onClickLink?: Types.Devlink.RuntimeProps;
  isSubMenuVisible?: Types.Visibility.VisibilityConditions;
  isBetaVisible?: Types.Visibility.VisibilityConditions;
  isWarningVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
