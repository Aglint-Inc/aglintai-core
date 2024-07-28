import * as React from "react";
import * as Types from "./types";

declare function RolesPopover(props: {
  as?: React.ElementType;
  slotSearch?: Types.Devlink.Slot;
  slotCard?: Types.Devlink.Slot;
  isHeaderVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
