import * as React from "react";
import * as Types from "./types";

declare function InterviewPlanDetail(props: {
  as?: React.ElementType;
  slotInterviewers?: Types.Devlink.Slot;
  slotButtons?: Types.Devlink.Slot;
  textModuleName?: React.ReactNode;
  isOnetoOneIconVisible?: Types.Visibility.VisibilityConditions;
  isPanelIconVisible?: Types.Visibility.VisibilityConditions;
  isDebriefIconVisible?: Types.Visibility.VisibilityConditions;
  textPlatformName?: React.ReactNode;
  textDuration?: React.ReactNode;
  textLink?: React.ReactNode;
  onClickLink?: Types.Devlink.RuntimeProps;
  isLinkVisible?: Types.Visibility.VisibilityConditions;
  textSelected?: React.ReactNode;
  slotPlatformIcon?: Types.Devlink.Slot;
  slotAddScheduleCard?: Types.Devlink.Slot;
  isAddCardVisible?: Types.Visibility.VisibilityConditions;
  isBreakCardVisible?: Types.Visibility.VisibilityConditions;
  slotBreakCard?: Types.Devlink.Slot;
}): React.JSX.Element;
