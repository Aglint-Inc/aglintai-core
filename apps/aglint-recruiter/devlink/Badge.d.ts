import * as React from "react";
import * as Types from "./types";

declare function Badge(props: {
  as?: React.ElementType;
  colorProps?: Types.Devlink.RuntimeProps;
  text?: React.ReactNode;
  slotIcon?: Types.Devlink.Slot;
  isIcon?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
