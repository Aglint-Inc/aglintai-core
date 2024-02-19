import * as React from "react";
import * as Types from "./types";

declare function AllInterview(props: {
  as?: React.ElementType;
  slotAddFilter?: Types.Devlink.Slot;
  onClickSort?: Types.Devlink.RuntimeProps;
  slotDate?: Types.Devlink.Slot;
  slotAllInterviewCard?: Types.Devlink.Slot;
  slotSidebar?: Types.Devlink.Slot;
  styleSidebarWidth?: Types.Devlink.RuntimeProps;
  slotPagination?: Types.Devlink.Slot;
  slotFilterButton?: Types.Devlink.Slot;
  isSchedulerTable?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
