import * as React from "react";
import * as Types from "./types";

declare function RcFormRadio(props: {
  as?: React.ElementType;
  onclickRadio?: Types.Devlink.RuntimeProps;
  isClicked?: Types.Visibility.VisibilityConditions;
  name?: React.ReactNode;
  isImageAvailabe?: Types.Visibility.VisibilityConditions;
  slotImage?: Types.Devlink.Slot;
}): React.JSX.Element;
