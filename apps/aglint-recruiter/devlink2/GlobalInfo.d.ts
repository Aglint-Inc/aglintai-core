import * as React from "react";
import * as Types from "./types";

declare function GlobalInfo(props: {
  as?: React.ElementType;
  textTitle?: React.ReactNode;
  textDescription?: React.ReactNode;
  iconName?: React.ReactNode;
  color?: Types.Builtin.Text;
  slotWidget?: Types.Devlink.Slot;
  showWidget?: Types.Visibility.VisibilityConditions;
  showDescription?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
