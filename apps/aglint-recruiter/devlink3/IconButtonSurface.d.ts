import * as React from "react";
import * as Types from "./types";

declare function IconButtonSurface(props: {
  as?: React.ElementType;
  onClickButton?: Types.Devlink.RuntimeProps;
  size?: Types.Builtin.Text;
  color?: Types.Builtin.Text;
  highContrast?: Types.Builtin.Text;
  isLoading?: Types.Visibility.VisibilityConditions;
  isDisabled?: Types.Visibility.VisibilityConditions;
  iconSize?: Types.Builtin.Text;
  iconWeight?: Types.Builtin.Text;
  iconColor?: Types.Builtin.Text;
  iconName?: React.ReactNode;
}): React.JSX.Element;
