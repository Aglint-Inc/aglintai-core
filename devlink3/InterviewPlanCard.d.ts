import * as React from "react";
import * as Types from "./types";

declare function InterviewPlanCard(props: {
  as?: React.ElementType;
  slotInterviewModuleInput?: Types.Devlink.Slot;
  slotDurationInput?: Types.Devlink.Slot;
  slotMemberList?: Types.Devlink.Slot;
  slotSearchMemberInput?: Types.Devlink.Slot;
  slotInputSelected?: Types.Devlink.Slot;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickDone?: Types.Devlink.RuntimeProps;
  isInterviewModuleVisible?: Types.Visibility.VisibilityConditions;
  isMemberVisible?: Types.Visibility.VisibilityConditions;
  isMemberSelectionVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
