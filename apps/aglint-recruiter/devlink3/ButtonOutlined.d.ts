import * as React from "react";
import * as Types from "./types";

declare function ButtonOutlined(props: {
  as?: React.ElementType;
  onClickButton?: Types.Devlink.RuntimeProps;
  color?: Types.Builtin.Text;
  highContrast?: Types.Builtin.Text;
  size?: Types.Builtin.Text;
  isLeftIcon?: Types.Visibility.VisibilityConditions;
  isRightIcon?: Types.Visibility.VisibilityConditions;
  textButton?: React.ReactNode;
  slotIcon?: Types.Devlink.Slot;
  isDisabled?: Types.Visibility.VisibilityConditions;
  isLoading?: Types.Visibility.VisibilityConditions;
  slotLoader?: Types.Devlink.Slot;
  iconSize?: Types.Builtin.Text;
  iconWeight?: Types.Builtin.Text;
  iconColor?: Types.Builtin.Text;
  iconName?: React.ReactNode;
}): React.JSX.Element;
