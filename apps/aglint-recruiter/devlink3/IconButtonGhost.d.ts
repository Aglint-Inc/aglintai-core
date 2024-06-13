import * as React from "react";
import * as Types from "./types";

declare function IconButtonGhost(props: {
  as?: React.ElementType;
  iconSize?: Types.Builtin.Text;
  iconWeight?: Types.Builtin.Text;
  iconColor?: Types.Builtin.Text;
  iconName?: React.ReactNode;
  size?: Types.Builtin.Text;
  isLoading?: Types.Visibility.VisibilityConditions;
  isDisabled?: Types.Visibility.VisibilityConditions;
  onClickButton?: Types.Devlink.RuntimeProps;
  color?: Types.Builtin.Text;
  highContrast?: Types.Builtin.Text;
}): React.JSX.Element;
