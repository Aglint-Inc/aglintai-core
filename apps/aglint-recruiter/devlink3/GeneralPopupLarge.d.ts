import * as React from "react";
import * as Types from "./types";

declare function GeneralPopupLarge(props: {
  as?: React.ElementType;
  slotPopup?: Types.Devlink.Slot;
  textDescription?: React.ReactNode;
  isDescriptionVisibe?: Types.Visibility.VisibilityConditions;
  onClickClose?: Types.Devlink.RuntimeProps;
  textPopupTitle?: React.ReactNode;
  onClickAction?: Types.Devlink.RuntimeProps;
  isIcon?: Types.Visibility.VisibilityConditions;
  textPopupButton?: React.ReactNode;
}): React.JSX.Element;
