import * as React from "react";
import * as Types from "./types";

declare function TextWithIcon(props: {
  as?: React.ElementType;
  fontWeight?: Types.Builtin.Text;
  textContent?: React.ReactNode;
  iconName?: React.ReactNode;
  iconSize?: Types.Builtin.Text;
  slotIcon?: Types.Devlink.Slot;
  color?: Types.Builtin.Text;
  fontSize?: Types.Builtin.Text;
  iconWeight?: Types.Builtin.Text;
}): React.JSX.Element;
