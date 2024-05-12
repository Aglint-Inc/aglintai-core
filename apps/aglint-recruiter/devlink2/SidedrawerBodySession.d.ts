import * as React from "react";
import * as Types from "./types";

declare function SidedrawerBodySession(props: {
  as?: React.ElementType;
  slotSessionNameInput?: Types.Devlink.Slot;
  slotDurationDropdown?: Types.Devlink.Slot;
  slotScheduleTypeDropdown?: Types.Devlink.Slot;
  slotModuleDropdown?: Types.Devlink.Slot;
  slotInterviewMode?: Types.Devlink.Slot;
}): React.JSX.Element;
