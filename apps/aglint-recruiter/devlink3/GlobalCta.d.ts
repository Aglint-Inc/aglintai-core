import * as React from "react";
import * as Types from "./types";

declare function GlobalCta(props: {
  as?: React.ElementType;
  color?: Types.Builtin.Text;
  textTitle?: React.ReactNode;
  textDescription?: React.ReactNode;
  slotButton?: Types.Devlink.Slot;
  iconName?: React.ReactNode;
}): React.JSX.Element;
