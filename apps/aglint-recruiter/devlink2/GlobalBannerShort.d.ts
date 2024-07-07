import * as React from "react";
import * as Types from "./types";

declare function GlobalBannerShort(props: {
  as?: React.ElementType;
  iconName?: React.ReactNode;
  textTitle?: React.ReactNode;
  textDescription?: React.ReactNode;
  slotButtons?: Types.Devlink.Slot;
  color?: Types.Builtin.Text;
}): React.JSX.Element;
