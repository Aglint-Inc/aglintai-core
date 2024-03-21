import * as React from "react";
import * as Types from "./types";

declare function InterviewerDetail(props: {
  as?: React.ElementType;
  textInterviewerName?: React.ReactNode;
  textDepartment?: React.ReactNode;
  textEmail?: React.ReactNode;
  textTimeZone?: React.ReactNode;
  textInterviewPerDay?: React.ReactNode;
  textInterviewPerWeek?: React.ReactNode;
  slotTrainingModules?: Types.Devlink.Slot;
  slotQualifiedModules?: Types.Devlink.Slot;
  slotScheduleTabs?: Types.Devlink.Slot;
  slotInterviewerAvatar?: Types.Devlink.Slot;
  slotTrainingModulesMoreMenu?: Types.Devlink.Slot;
  slotQualifiedModulesMoreMenu?: Types.Devlink.Slot;
  onClickAddModulesTraining?: Types.Devlink.RuntimeProps;
  onClickAddInterviewModules?: Types.Devlink.RuntimeProps;
  isModuleTrainingVisible?: Types.Visibility.VisibilityConditions;
  onClickInterviewSchedule?: Types.Devlink.RuntimeProps;
  textInterviewToday?: React.ReactNode;
  textInterviewWeek?: React.ReactNode;
}): React.JSX.Element;
