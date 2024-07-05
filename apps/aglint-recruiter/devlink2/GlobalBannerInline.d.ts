import * as React from "react";
import * as Types from "./types";

declare function GlobalBannerInline(props: {
  as?: React.ElementType;
  iconName?: React.ReactNode;
  textContent?: React.ReactNode;
  slotButton?: Types.Devlink.Slot;
  color?: Types.Builtin.Text;
}): React.JSX.Element;
