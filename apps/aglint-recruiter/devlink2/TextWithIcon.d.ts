import * as React from "react";
import * as Types from "./types";

declare function TextWithIcon(props: {
  as?: React.ElementType;
  color?: Types.Builtin.Text;
  fontWeight?: Types.Builtin.Text;
  textContent?: React.ReactNode;
  iconName?: React.ReactNode;
  iconSize?: Types.Builtin.Text;
  slotIcon?: Types.Devlink.Slot;
  iconWeight?: Types.Builtin.Text;
  iconColor?: Types.Builtin.Text;
  fontSize?: Types.Builtin.Text;
  fontColor?: Types.Builtin.Text;
}): React.JSX.Element;
