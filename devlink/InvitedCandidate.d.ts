import * as React from "react";
import * as Types from "./types";

declare function InvitedCandidate(props: {
  as?: React.ElementType;
  onClickScheduler?: Types.Devlink.RuntimeProps;
  textHeader?: React.ReactNode;
  textDuration?: React.ReactNode;
  slotMeetingIcon?: Types.Devlink.Slot;
  textMeetingPlatform?: React.ReactNode;
  slotProfileAvatar?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  slotAvatarImage?: Types.Devlink.Slot;
  textInterviewPanelName?: React.ReactNode;
  textSlotsBookedText?: React.ReactNode;
}): React.JSX.Element;
