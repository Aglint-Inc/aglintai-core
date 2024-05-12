import * as React from "react";
import * as Types from "./types";

declare function ButtonPrimaryBasicLarge(props: {
  as?: React.ElementType;
  isFocused?: Types.Visibility.VisibilityConditions;
  startIconSlot?: Types.Devlink.Slot;
  endIconSlot?: Types.Devlink.Slot;
  buttonText?: React.ReactNode;
  buttonProps?: Types.Devlink.RuntimeProps;
  isDisabled?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
