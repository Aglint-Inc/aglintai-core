import * as React from "react";
import * as Types from "./types";

declare function ButtonPrimaryOutlinedLarge(props: {
  as?: React.ElementType;
  startIconSlot?: Types.Devlink.Slot;
  endIconSlot?: Types.Devlink.Slot;
  buttonText?: React.ReactNode;
  isFocused?: Types.Visibility.VisibilityConditions;
  buttonProps?: Types.Devlink.RuntimeProps;
  isDisabled?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
