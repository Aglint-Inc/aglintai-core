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
  onClickViewScheduler?: Types.Devlink.RuntimeProps;
  textTimeDate?: React.ReactNode;
  slotStatusBadge?: Types.Devlink.Slot;
}): React.JSX.Element;
