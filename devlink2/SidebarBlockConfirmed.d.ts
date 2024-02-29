import * as React from "react";
import * as Types from "./types";

declare function SidebarBlockConfirmed(props: {
  as?: React.ElementType;
  textScheduleName?: React.ReactNode;
  slotScheduleInfo?: Types.Devlink.Slot;
  onClickReminder?: Types.Devlink.RuntimeProps;
  slotInterviewPanel?: Types.Devlink.Slot;
  onClickReschedule?: Types.Devlink.RuntimeProps;
  onClickCancelSchedule?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
