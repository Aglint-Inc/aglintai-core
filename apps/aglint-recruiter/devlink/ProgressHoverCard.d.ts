import * as React from "react";
import * as Types from "./types";

declare function ProgressHoverCard(props: {
  as?: React.ElementType;
  slotInterviewTypeIcon?: Types.Devlink.Slot;
  textScheduleName?: React.ReactNode;
  slotScheduleStatus?: Types.Devlink.Slot;
  isScheduleDate?: Types.Visibility.VisibilityConditions;
  textScheduleDate?: React.ReactNode;
  textDuration?: React.ReactNode;
  slotMeetingTypeIcon?: Types.Devlink.Slot;
  textMeetingType?: React.ReactNode;
}): React.JSX.Element;
