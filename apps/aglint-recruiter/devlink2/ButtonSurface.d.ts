import * as React from "react";
import * as Types from "./types";

declare function ButtonSurface(props: {
  as?: React.ElementType;
  isLeftIcon?: Types.Visibility.VisibilityConditions;
  isRightIcon?: Types.Visibility.VisibilityConditions;
  textButton?: React.ReactNode;
  slotIcon?: Types.Devlink.Slot;
  isDisabled?: Types.Visibility.VisibilityConditions;
  size?: Types.Builtin.Text;
  slotLoader?: Types.Devlink.Slot;
  highContrast?: Types.Builtin.Text;
  color?: Types.Builtin.Text;
  onClickButton?: Types.Devlink.RuntimeProps;
  isLoading?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
