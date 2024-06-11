import * as React from "react";
import * as Types from "./types";

declare function IconButtonGhost(props: {
  as?: React.ElementType;
  iconName?: React.ReactNode;
  iconSize?: Types.Builtin.Text;
  iconWeight?: Types.Builtin.Text;
  iconColor?: Types.Builtin.Text;
  isDisabled?: Types.Visibility.VisibilityConditions;
  isLoading?: Types.Visibility.VisibilityConditions;
  color?: Types.Builtin.Text;
  highContrast?: Types.Builtin.Text;
  size?: Types.Builtin.Text;
}): React.JSX.Element;
