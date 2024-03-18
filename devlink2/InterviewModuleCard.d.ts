import * as React from "react";
import * as Types from "./types";

declare function InterviewModuleCard(props: {
  as?: React.ElementType;
  textModuleName?: React.ReactNode;
  textMembersCount?: React.ReactNode;
  slotMemberPic?: Types.Devlink.Slot;
  textUpcomingSchedules?: React.ReactNode;
  textCompletedSchedules?: React.ReactNode;
  isUpcomingScheduleEmpty?: Types.Visibility.VisibilityConditions;
  isUpcomingScheduleVisible?: Types.Visibility.VisibilityConditions;
  isCompletedScheduleEmpty?: Types.Visibility.VisibilityConditions;
  isCompletedScheduleVisible?: Types.Visibility.VisibilityConditions;
  onClickCard?: Types.Devlink.RuntimeProps;
  textObjective?: React.ReactNode;
  isObjectiveVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
