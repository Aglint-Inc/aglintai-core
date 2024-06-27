import * as React from "react";
import * as Types from "./types";

declare function InterviewConfirmedCard(props: {
  as?: React.ElementType;
  textDate?: React.ReactNode;
  textTime?: React.ReactNode;
  textPanel?: React.ReactNode;
  slotMeetingIcon?: Types.Devlink.Slot;
  textPlatformName?: React.ReactNode;
  textDuration?: React.ReactNode;
  onClickJoinGoogleMeet?: Types.Devlink.RuntimeProps;
  onClickAddCalendar?: Types.Devlink.RuntimeProps;
  isJoinMeetingButtonVisible?: Types.Visibility.VisibilityConditions;
  isAddtoCalenderVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
