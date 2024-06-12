import * as React from "react";
import * as Types from "./types";

declare function ButtonGhost(props: {
  as?: React.ElementType;
  isLeftIcon?: Types.Visibility.VisibilityConditions;
  slotIcon?: Types.Devlink.Slot;
  onClickButton?: Types.Devlink.RuntimeProps;
  textButton?: React.ReactNode;
  isRightIcon?: Types.Visibility.VisibilityConditions;
  isDisabled?: Types.Visibility.VisibilityConditions;
  isLoading?: Types.Visibility.VisibilityConditions;
  slotLoader?: Types.Devlink.Slot;
  color?: Types.Builtin.Text;
  highContrast?: Types.Builtin.Text;
  size?: Types.Builtin.Text;
  iconSize?: Types.Builtin.Text;
  iconWeight?: Types.Builtin.Text;
  iconColor?: Types.Builtin.Text;
  iconName?: React.ReactNode;
}): React.JSX.Element;
