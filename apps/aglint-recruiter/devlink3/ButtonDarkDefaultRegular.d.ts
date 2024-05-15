import * as React from "react";
import * as Types from "./types";

declare function ButtonDarkDefaultRegular(props: {
  as?: React.ElementType;
  endIconSlot?: Types.Devlink.Slot;
  startIconSlot?: Types.Devlink.Slot;
  buttonText?: React.ReactNode;
  buttonProps?: Types.Devlink.RuntimeProps;
  isFocused?: Types.Visibility.VisibilityConditions;
  isDisabled?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
