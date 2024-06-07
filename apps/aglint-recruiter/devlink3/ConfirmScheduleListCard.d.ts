import * as React from "react";
import * as Types from "./types";

declare function ConfirmScheduleListCard(props: {
  as?: React.ElementType;
  slotIconPanel?: Types.Devlink.Slot;
  textPanelName?: React.ReactNode;
  textTime?: React.ReactNode;
  slotMeetingIcon?: Types.Devlink.Slot;
  textMeetingPlatformName?: React.ReactNode;
  textDuration?: React.ReactNode;
}): React.JSX.Element;
