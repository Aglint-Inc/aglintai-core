import * as React from "react";
import * as Types from "./types";

declare function GlobalBadge(props: {
  as?: React.ElementType;
  size?: Types.Builtin.Text;
  color?: Types.Builtin.Text;
  variant?: Types.Builtin.Text;
  iconName?: React.ReactNode;
  iconSize?: Types.Builtin.Text;
  iconWeight?: Types.Builtin.Text;
  iconColor?: Types.Builtin.Text;
  textBadge?: React.ReactNode;
  showIcon?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
