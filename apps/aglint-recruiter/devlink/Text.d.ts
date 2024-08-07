import * as React from "react";
import * as Types from "./types";

declare function Text(props: {
  as?: React.ElementType;
  size?: Types.Builtin.Text;
  weight?: Types.Builtin.Text;
  align?: Types.Builtin.Text;
  content?: React.ReactNode;
  color?: Types.Builtin.Text;
  highContrast?: Types.Builtin.Text;
  text?: React.ReactNode;
  styleProps?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
