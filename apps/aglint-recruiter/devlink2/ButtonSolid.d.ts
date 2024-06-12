import * as React from "react";
import * as Types from "./types";

declare function ButtonSolid(props: {
  as?: React.ElementType;
  slotIcon?: Types.Devlink.Slot;
  textButton?: React.ReactNode;
  isLeftIcon?: Types.Visibility.VisibilityConditions;
  isRightIcon?: Types.Visibility.VisibilityConditions;
  onClickButton?: Types.Devlink.RuntimeProps;
  slotLoader?: Types.Devlink.Slot;
  isLoading?: Types.Visibility.VisibilityConditions;
  isDisabled?: Types.Visibility.VisibilityConditions;
  size?: Types.Builtin.Text;
  color?: Types.Builtin.Text;
  highContrast?: Types.Builtin.Text;
  iconName?: React.ReactNode;
  iconSize?: Types.Builtin.Text;
  iconWeight?: Types.Builtin.Text;
  iconColor?: Types.Builtin.Text;
}): React.JSX.Element;
