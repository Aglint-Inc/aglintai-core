import * as React from "react";
import * as Types from "./types";

declare function ScheduleInfoUpcoming(props: {
  as?: React.ElementType;
  textDate?: React.ReactNode;
  textDay?: React.ReactNode;
  textStatus?: React.ReactNode;
  textMonth?: React.ReactNode;
  textTitle?: React.ReactNode;
  textTime?: React.ReactNode;
  slotMeetingIcon?: Types.Devlink.Slot;
  textPlatformName?: React.ReactNode;
  slotMemberProfile?: Types.Devlink.Slot;
  slotButtonPrimary?: Types.Devlink.Slot;
  onClickCopyLink?: Types.Devlink.RuntimeProps;
  textLink?: React.ReactNode;
  isLinkVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
