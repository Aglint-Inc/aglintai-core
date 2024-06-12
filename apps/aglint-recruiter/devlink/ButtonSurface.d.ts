import * as React from "react";
import * as Types from "./types";

declare function ButtonSurface(props: {
  as?: React.ElementType;
  onClickButton?: Types.Devlink.RuntimeProps;
  color?: Types.Builtin.Text;
  highContrast?: Types.Builtin.Text;
  size?: Types.Builtin.Text;
  isLeftIcon?: Types.Visibility.VisibilityConditions;
  slotIcon?: Types.Devlink.Slot;
  textButton?: React.ReactNode;
  isRightIcon?: Types.Visibility.VisibilityConditions;
  isDisabled?: Types.Visibility.VisibilityConditions;
  isLoading?: Types.Visibility.VisibilityConditions;
  slotLoader?: Types.Devlink.Slot;
  iconSize?: Types.Builtin.Text;
  iconWeight?: Types.Builtin.Text;
  iconColor?: Types.Builtin.Text;
  iconName?: React.ReactNode;
}): React.JSX.Element;
