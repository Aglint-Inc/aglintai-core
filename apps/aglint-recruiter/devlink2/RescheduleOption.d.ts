import * as React from "react";
import * as Types from "./types";

declare function RescheduleOption(props: {
  as?: React.ElementType;
  slotScheduligLink?: Types.Devlink.Slot;
  slotReqAvailability?: Types.Devlink.Slot;
  slotEmailAgent?: Types.Devlink.Slot;
  slotPhoneAgent?: Types.Devlink.Slot;
  isSchedulingLinkActive?: Types.Visibility.VisibilityConditions;
  isReqAvailabilityActive?: Types.Visibility.VisibilityConditions;
  isEmailAgentActive?: Types.Visibility.VisibilityConditions;
  isPhoneAgentActive?: Types.Visibility.VisibilityConditions;
  onClickSchedulingLink?: Types.Devlink.RuntimeProps;
  onClickReqAvailability?: Types.Devlink.RuntimeProps;
  onClickEmailAgent?: Types.Devlink.RuntimeProps;
  onClickPhoneAgent?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
