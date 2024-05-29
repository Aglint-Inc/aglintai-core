import * as React from "react";
import * as Types from "./types";

declare function NavLink(props: {
  as?: React.ElementType;
  isActive?: Types.Visibility.VisibilityConditions;
  texttooltip?: React.ReactNode;
  slotIcon?: Types.Devlink.Slot;
}): React.JSX.Element;
