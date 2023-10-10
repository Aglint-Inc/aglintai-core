import * as React from "react";
import * as Types from "./types";

declare function ButtonPrimaryDefaultLarge(props: {
  as?: React.ElementType;
  startIconSlot?: Types.Devlink.Slot;
  endIconSlot?: Types.Devlink.Slot;
  buttonText?: React.ReactNode;
  buttonProps?: Types.Devlink.RuntimeProps;
  isFocused?: Types.Visibility.VisibilityConditions;
  isDisabled?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
