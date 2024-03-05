import * as React from "react";
import * as Types from "./types";

declare function ScheduleInfo(props: {
  as?: React.ElementType;
  onClickRequest?: Types.Devlink.RuntimeProps;
  textTime?: React.ReactNode;
  slotMeetingIcon?: Types.Devlink.Slot;
  textMeetingPlatform?: React.ReactNode;
  slotMemberImage?: Types.Devlink.Slot;
  textDate?: React.ReactNode;
  textDay?: React.ReactNode;
  textMonth?: React.ReactNode;
  onClickJoinMeet?: Types.Devlink.RuntimeProps;
  onClickCopyLink?: Types.Devlink.RuntimeProps;
  slotProfileImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  textLocation?: React.ReactNode;
  onClickViewProfile?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
