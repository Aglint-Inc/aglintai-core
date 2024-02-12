import * as React from "react";
import * as Types from "./types";

declare function AllInterview(props: {
  as?: React.ElementType;
  slotSearch?: Types.Devlink.Slot;
  slotSchedule?: Types.Devlink.Slot;
  slotStatus?: Types.Devlink.Slot;
  slotAddFilter?: Types.Devlink.Slot;
  onClickSort?: Types.Devlink.RuntimeProps;
  slotDate?: Types.Devlink.Slot;
  slotAllInterviewCard?: Types.Devlink.Slot;
  slotSidebar?: Types.Devlink.Slot;
  styleSidebarWidth?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
