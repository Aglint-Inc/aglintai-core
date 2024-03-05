import * as React from "react";
import * as Types from "./types";

declare function InterviewScreenCard(props: {
  as?: React.ElementType;
  textTitle?: React.ReactNode;
  textTime?: React.ReactNode;
  slotMeetingIcon?: Types.Devlink.Slot;
  textMeetingPlatform?: React.ReactNode;
  slotMemberImage?: Types.Devlink.Slot;
  isUpcomingVisible?: Types.Visibility.VisibilityConditions;
  isCompletedVisible?: Types.Visibility.VisibilityConditions;
  textDate?: React.ReactNode;
  textDay?: React.ReactNode;
  textMonth?: React.ReactNode;
}): React.JSX.Element;
