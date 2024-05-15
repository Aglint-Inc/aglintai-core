import * as React from "react";
import * as Types from "./types";

declare function RecPrimaryBtn(props: {
  as?: React.ElementType;
  isDisabled?: Types.Visibility.VisibilityConditions;
  isFocused?: Types.Visibility.VisibilityConditions;
  buttonText?: React.ReactNode;
  slotStartIcon?: Types.Devlink.Slot;
  onClickButton?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
