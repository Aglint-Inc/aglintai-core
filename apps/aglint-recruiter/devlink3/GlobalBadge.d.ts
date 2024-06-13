import * as React from "react";
import * as Types from "./types";

declare function GlobalBadge(props: {
  as?: React.ElementType;
  showIcon?: Types.Visibility.VisibilityConditions;
  textBadge?: React.ReactNode;
  size?: Types.Builtin.Text;
  color?: Types.Builtin.Text;
  variant?: Types.Builtin.Text;
  iconSize?: Types.Builtin.Text;
  iconWeight?: Types.Builtin.Text;
  iconColor?: Types.Builtin.Text;
  iconName?: React.ReactNode;
}): React.JSX.Element;
