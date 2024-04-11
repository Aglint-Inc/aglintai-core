import * as React from "react";
import * as Types from "./types";

declare function ScheduleProgressPill(props: {
  as?: React.ElementType;
  isStarting?: Types.Visibility.VisibilityConditions;
  isEnding?: Types.Visibility.VisibilityConditions;
  slotProgressIcon?: Types.Devlink.Slot;
  styleBgColor?: Types.Devlink.RuntimeProps;
  textScheduleName?: React.ReactNode;
  slotScheduleStatus?: Types.Devlink.Slot;
  textScheduleDate?: React.ReactNode;
  isScheduleDate?: Types.Visibility.VisibilityConditions;
  textDuration?: React.ReactNode;
  textMeetingType?: React.ReactNode;
  slotMeetingTypeIcon?: Types.Devlink.Slot;
  slotInterviewTypeIcon?: Types.Devlink.Slot;
}): React.JSX.Element;
