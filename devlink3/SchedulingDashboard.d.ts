import * as React from "react";
import * as Types from "./types";

declare function SchedulingDashboard(props: {
  as?: React.ElementType;
  onClickCandidates?: Types.Devlink.RuntimeProps;
  onClickMySchedule?: Types.Devlink.RuntimeProps;
  onClickInterviewTypes?: Types.Devlink.RuntimeProps;
  onClickInterviewers?: Types.Devlink.RuntimeProps;
  onClickScheduleSetting?: Types.Devlink.RuntimeProps;
  slotFirstGrid?: Types.Devlink.Slot;
  slotGridInterviewDetail?: Types.Devlink.Slot;
  slotInterviewStatic?: Types.Devlink.Slot;
  slotInterviewModuleStats?: Types.Devlink.Slot;
}): React.JSX.Element;
