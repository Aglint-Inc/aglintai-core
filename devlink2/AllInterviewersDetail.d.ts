import * as React from "react";
import * as Types from "./types";

declare function AllInterviewersDetail(props: {
  as?: React.ElementType;
  onClickPauseModules?: Types.Devlink.RuntimeProps;
  onClickRemoveModules?: Types.Devlink.RuntimeProps;
  slotSchedule?: Types.Devlink.Slot;
  slotModule?: Types.Devlink.Slot;
  slotTimeZone?: Types.Devlink.Slot;
  textModuleDescription?: React.ReactNode;
}): React.JSX.Element;
