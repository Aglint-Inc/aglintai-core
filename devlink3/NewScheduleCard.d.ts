import * as React from "react";
import * as Types from "./types";

declare function NewScheduleCard(props: {
  as?: React.ElementType;
  textMonth?: React.ReactNode;
  textDate?: React.ReactNode;
  textDay?: React.ReactNode;
  textTitle?: React.ReactNode;
  textMeetTime?: React.ReactNode;
  slotIconMeeting?: Types.Devlink.Slot;
  textPlatformName?: React.ReactNode;
  slotCandidateImage?: Types.Devlink.Slot;
  textCandidateName?: React.ReactNode;
}): React.JSX.Element;
