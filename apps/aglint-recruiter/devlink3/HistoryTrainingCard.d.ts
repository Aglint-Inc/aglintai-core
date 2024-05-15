import * as React from "react";
import * as Types from "./types";

declare function HistoryTrainingCard(props: {
  as?: React.ElementType;
  isReverseShadow?: Types.Visibility.VisibilityConditions;
  isShadow?: Types.Visibility.VisibilityConditions;
  textInterviewType?: React.ReactNode;
  slotStatus?: Types.Devlink.Slot;
  textDate?: React.ReactNode;
  textTime?: React.ReactNode;
  textDuration?: React.ReactNode;
  textPlatformName?: React.ReactNode;
  slotMeetingIcon?: Types.Devlink.Slot;
  isNotScheduleVisible?: Types.Visibility.VisibilityConditions;
  isSchedule?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
