import * as React from "react";
import * as Types from "./types";

declare function JobStatusSelectBlock(props: {
  as?: React.ElementType;
  onClickStart?: Types.Devlink.RuntimeProps;
  isStartActive?: Types.Visibility.VisibilityConditions;
  onClickSchedule?: Types.Devlink.RuntimeProps;
  isScheduleActive?: Types.Visibility.VisibilityConditions;
  isSchedule?: Types.Visibility.VisibilityConditions;
  slotBody?: Types.Devlink.Slot;
  slotButtons?: Types.Devlink.Slot;
  scheduleText?: React.ReactNode;
}): React.JSX.Element;
