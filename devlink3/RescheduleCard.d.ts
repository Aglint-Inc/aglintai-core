import * as React from "react";
import * as Types from "./types";

declare function RescheduleCard(props: {
  as?: React.ElementType;
  slotProfileImage?: Types.Devlink.Slot;
  textReschedule?: React.ReactNode;
  textReason?: React.ReactNode;
  onClickRescheduleNow?: Types.Devlink.RuntimeProps;
  onClickChangeInterviewer?: Types.Devlink.RuntimeProps;
  isChangeInterviewerVisible?: Types.Visibility.VisibilityConditions;
  isButtonVisible?: Types.Visibility.VisibilityConditions;
  bgColorProps?: Types.Devlink.RuntimeProps;
  textColorProps?: Types.Devlink.RuntimeProps;
  textName?: React.ReactNode;
}): React.JSX.Element;
