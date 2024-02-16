import * as React from "react";
import * as Types from "./types";

declare function ScheduleDetails(props: {
  as?: React.ElementType;
  slotCandidateDetails?: Types.Devlink.Slot;
  isCompletedVisible?: Types.Visibility.VisibilityConditions;
  isUpcomingVisible?: Types.Visibility.VisibilityConditions;
  textDuration?: React.ReactNode;
  textTime?: React.ReactNode;
  textPlatformName?: React.ReactNode;
  slotPlatformLogo?: Types.Devlink.Slot;
  textMonth?: React.ReactNode;
  textDate?: React.ReactNode;
  textDay?: React.ReactNode;
  textNotificationTime?: React.ReactNode;
  onClickJoinGoogleMeet?: Types.Devlink.RuntimeProps;
  textMeetingLink?: React.ReactNode;
  onClickCopyMeetingLink?: Types.Devlink.RuntimeProps;
  textPanelName?: React.ReactNode;
  slotPanelList?: Types.Devlink.Slot;
}): React.JSX.Element;
