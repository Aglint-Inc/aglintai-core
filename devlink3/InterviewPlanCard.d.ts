import * as React from "react";
import * as Types from "./types";

declare function InterviewPlanCard(props: {
  as?: React.ElementType;
  slotInterviewModuleInput?: Types.Devlink.Slot;
  slotDurationInput?: Types.Devlink.Slot;
  slotInputSelectedQualified?: Types.Devlink.Slot;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickDone?: Types.Devlink.RuntimeProps;
  isInterviewModuleVisible?: Types.Visibility.VisibilityConditions;
  isMemberSelectionVisible?: Types.Visibility.VisibilityConditions;
  isSessionNameVisible?: Types.Visibility.VisibilityConditions;
  slotSessionNameInput?: Types.Devlink.Slot;
  isQualifiedMemberVisible?: Types.Visibility.VisibilityConditions;
  slotQualifiedMemberList?: Types.Devlink.Slot;
  slotSearchQualifiedMember?: Types.Devlink.Slot;
  slotShadowMemberList?: Types.Devlink.Slot;
  slotShadowMemberSearch?: Types.Devlink.Slot;
  isShadowMemberVisible?: Types.Visibility.VisibilityConditions;
  slotReverseShadowMemberList?: Types.Devlink.Slot;
  slotRsSearch?: Types.Devlink.Slot;
  isReverseShadowVisible?: Types.Visibility.VisibilityConditions;
  slotScheduleTypeInput?: Types.Devlink.Slot;
  isScheduleTypeVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
