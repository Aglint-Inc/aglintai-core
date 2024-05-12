import * as React from "react";
import * as Types from "./types";

declare function ScheduleInfoBlock(props: {
  as?: React.ElementType;
  isDuration?: Types.Visibility.VisibilityConditions;
  textDuration?: React.ReactNode;
  textMeetingType?: React.ReactNode;
  textDateTimeOrSlots?: React.ReactNode;
  slotScheduleTypeIcon?: Types.Devlink.Slot;
}): React.JSX.Element;
