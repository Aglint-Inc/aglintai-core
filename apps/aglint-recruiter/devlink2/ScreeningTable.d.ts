import * as React from "react";
import * as Types from "./types";

declare function ScreeningTable(props: {
  as?: React.ElementType;
  slotFilterButton?: Types.Devlink.Slot;
  slotAddFilter?: Types.Devlink.Slot;
  slotDate?: Types.Devlink.Slot;
  slotScreeningCards?: Types.Devlink.Slot;
  styleSidebarWidth?: Types.Devlink.RuntimeProps;
  slotSidebar?: Types.Devlink.Slot;
  isAddFilterVisible?: Types.Visibility.VisibilityConditions;
  slotRefreshButton?: Types.Devlink.Slot;
  isSortVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
