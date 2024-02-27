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
}): React.JSX.Element;
