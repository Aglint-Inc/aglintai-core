import * as React from "react";
import * as Types from "./types";

declare function PopupAgentFollowup(props: {
  as?: React.ElementType;
  slotRadioWithText?: Types.Devlink.Slot;
  isScheduleLater?: Types.Visibility.VisibilityConditions;
  slotDateTimePicker?: Types.Devlink.Slot;
  isImmediately?: Types.Visibility.VisibilityConditions;
  textMessage?: React.ReactNode;
}): React.JSX.Element;
