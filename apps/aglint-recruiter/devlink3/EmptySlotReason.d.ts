import * as React from "react";
import * as Types from "./types";

declare function EmptySlotReason(props: {
  as?: React.ElementType;
  iconName?: React.ReactNode;
  textMain?: React.ReactNode;
  textSub?: React.ReactNode;
  color?: Types.Builtin.Text;
}): React.JSX.Element;
