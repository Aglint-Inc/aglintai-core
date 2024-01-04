import * as React from "react";
import * as Types from "./types";

declare function RcFormRadio(props: {
  as?: React.ElementType;
  onclickRadio?: Types.Devlink.RuntimeProps;
  isClicked?: Types.Visibility.VisibilityConditions;
  text?: React.ReactNode;
  isImageAvailabe?: Types.Visibility.VisibilityConditions;
  isTextVisible?: Types.Visibility.VisibilityConditions;
  slotLogo?: Types.Devlink.Slot;
}): React.JSX.Element;
