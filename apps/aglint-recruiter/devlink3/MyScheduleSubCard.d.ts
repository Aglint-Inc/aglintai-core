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
  isPhoneCallVisible?: Types.Visibility.VisibilityConditions;
  bgColorProps?: Types.Devlink.RuntimeProps;
  textJob?: React.ReactNode;
  slotMembersList?: Types.Devlink.Slot;
  onClickDropdownIocn?: Types.Devlink.RuntimeProps;
  isMembersListVisible?: Types.Visibility.VisibilityConditions;
  slotThreeDot?: Types.Devlink.Slot;
  isDropdownIconVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
