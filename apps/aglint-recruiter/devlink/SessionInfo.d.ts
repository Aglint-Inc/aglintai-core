import * as React from "react";
import * as Types from "./types";

declare function SessionInfo(props: {
  as?: React.ElementType;
  textSessionName?: React.ReactNode;
  textSessionDuration?: React.ReactNode;
  textMeetingType?: React.ReactNode;
  slotMeetingTypeIcon?: Types.Devlink.Slot;
  slotInterviewtypeIcon?: Types.Devlink.Slot;
  iconName?: React.ReactNode;
}): React.JSX.Element;
