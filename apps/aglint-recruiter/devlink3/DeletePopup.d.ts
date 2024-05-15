import * as React from "react";
import * as Types from "./types";

declare function DeletePopup(props: {
  as?: React.ElementType;
  textDescription?: React.ReactNode;
  textTitle?: React.ReactNode;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickDelete?: Types.Devlink.RuntimeProps;
  slotIcon?: Types.Devlink.Slot;
  isIcon?: Types.Visibility.VisibilityConditions;
  isWidget?: Types.Visibility.VisibilityConditions;
  buttonText?: React.ReactNode;
  slotWidget?: Types.Devlink.Slot;
}): React.JSX.Element;
