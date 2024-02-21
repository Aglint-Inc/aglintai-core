import * as React from "react";
import * as Types from "./types";

declare function JobCardSchedule(props: {
  as?: React.ElementType;
  textHeader?: React.ReactNode;
  textDuration?: React.ReactNode;
  slotPlatformIcon?: Types.Devlink.Slot;
  textPlatformName?: React.ReactNode;
  slotMemberImage?: Types.Devlink.Slot;
  textPanelMember?: React.ReactNode;
  textStatus?: React.ReactNode;
  propsBgColor?: Types.Devlink.RuntimeProps;
  onClickViewScheduler?: Types.Devlink.RuntimeProps;
  textTimeDate?: React.ReactNode;
}): React.JSX.Element;
