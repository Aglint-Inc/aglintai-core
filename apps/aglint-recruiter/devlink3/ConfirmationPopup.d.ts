import * as React from "react";
import * as Types from "./types";

declare function ConfirmationPopup(props: {
  as?: React.ElementType;
  textPopupDescription?: React.ReactNode;
  textPopupTitle?: React.ReactNode;
  textPopupButton?: React.ReactNode;
  slotWidget?: Types.Devlink.Slot;
  isWidget?: Types.Visibility.VisibilityConditions;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickAction?: Types.Devlink.RuntimeProps;
  isIcon?: Types.Visibility.VisibilityConditions;
  isYellowButtonVisible?: Types.Visibility.VisibilityConditions;
  isBlueButtonVisible?: Types.Visibility.VisibilityConditions;
  isGreyButtonVisible?: Types.Visibility.VisibilityConditions;
  isDescriptionVisible?: Types.Visibility.VisibilityConditions;
  widthStyleProps?: Types.Devlink.RuntimeProps;
  slotButton?: Types.Devlink.Slot;
  isSlotButtonVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
