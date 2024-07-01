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
}): React.JSX.Element;
