import * as React from "react";
import * as Types from "./types";

declare function Text(props: {
  as?: React.ElementType;
  align?: Types.Builtin.Text;
  size?: Types.Builtin.Text;
  weight?: Types.Builtin.Text;
  color?: Types.Builtin.Text;
  highContrast?: Types.Builtin.Text;
  content?: React.ReactNode;
  styleProps?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
