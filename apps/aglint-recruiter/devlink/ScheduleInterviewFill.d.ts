import * as React from "react";
import * as Types from "./types";

declare function ScheduleInterviewFill(props: {
  as?: React.ElementType;
  slotProfileAvatar?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  slotInputName?: Types.Devlink.Slot;
  onClickPersonMeeting?: Types.Devlink.RuntimeProps;
  isPersonMeetingActive?: Types.Visibility.VisibilityConditions;
  onClickGoogleMeet?: Types.Devlink.RuntimeProps;
  isGoogleMeetActive?: Types.Visibility.VisibilityConditions;
  onClickZoom?: Types.Devlink.RuntimeProps;
  isZoomActive?: Types.Visibility.VisibilityConditions;
  onClickPhoneCall?: Types.Devlink.RuntimeProps;
  isPhoneCallActive?: Types.Visibility.VisibilityConditions;
  slotInterviewPanel?: Types.Devlink.Slot;
  isPanelMembersVisible?: Types.Visibility.VisibilityConditions;
  slotInterviewpanelPills?: Types.Devlink.Slot;
  textSelectedCount?: React.ReactNode;
  isPersonMeetingVisible?: Types.Visibility.VisibilityConditions;
  isZoomVisible?: Types.Visibility.VisibilityConditions;
  isPhoneCallVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
