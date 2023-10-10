import * as React from "react";
import * as Types from "./types";

declare function ButtonDarkBasicLarge(props: {
  as?: React.ElementType;
  endIconSlot?: Types.Devlink.Slot;
  buttonText?: React.ReactNode;
  startIconSlot?: Types.Devlink.Slot;
  buttonProps?: Types.Devlink.RuntimeProps;
  isFocused?: Types.Visibility.VisibilityConditions;
  isDisabled?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
