import * as React from "react";
import * as Types from "./types";

declare function MyScheduleSubCard(props: {
  as?: React.ElementType;
  slotStatus?: Types.Devlink.Slot;
  textTime?: React.ReactNode;
  isTimeVisible?: Types.Visibility.VisibilityConditions;
  isOnetoOneVisible?: Types.Visibility.VisibilityConditions;
  isPanelIconVisible?: Types.Visibility.VisibilityConditions;
  isDebriefIconVisible?: Types.Visibility.VisibilityConditions;
  textMeetingTitle?: React.ReactNode;
  textMeetingPlatform?: React.ReactNode;
  slotMeetingIcon?: Types.Devlink.Slot;
  isMeetingPlatformVisible?: Types.Visibility.VisibilityConditions;
  isDurationVisible?: Types.Visibility.VisibilityConditions;
  textDuration?: React.ReactNode;
  isLocationVisible?: Types.Visibility.VisibilityConditions;
  textLocation?: React.ReactNode;
  slotCandidateImage?: Types.Devlink.Slot;
  textCandidateName?: React.ReactNode;
  isCandidateNameVisible?: Types.Visibility.VisibilityConditions;
  isPhoneCallVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
