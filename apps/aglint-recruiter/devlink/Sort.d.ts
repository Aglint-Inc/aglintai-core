import * as React from "react";
import * as Types from "./types";

declare function Sort(props: {
  as?: React.ElementType;
  slotSortDrop?: Types.Devlink.Slot;
  onClickAscending?: Types.Devlink.RuntimeProps;
  onClickDescending?: Types.Devlink.RuntimeProps;
  isDescendingActive?: Types.Visibility.VisibilityConditions;
  isAscendingActive?: Types.Visibility.VisibilityConditions;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
