import * as React from "react";
import * as Types from "./types";

declare function IconButtonSolid(props: {
  as?: React.ElementType;
  iconName?: React.ReactNode;
  iconsize?: Types.Builtin.Text;
  iconWeight?: Types.Builtin.Text;
  iconColor?: Types.Builtin.Text;
  size?: Types.Builtin.Text;
  color?: Types.Builtin.Text;
  highContrast?: Types.Builtin.Text;
  isDisabled?: Types.Visibility.VisibilityConditions;
  isLoading?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
