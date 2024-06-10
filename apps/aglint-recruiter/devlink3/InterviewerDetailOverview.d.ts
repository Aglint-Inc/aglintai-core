import * as React from "react";
import * as Types from "./types";

declare function InterviewerDetailOverview(props: {
  as?: React.ElementType;
  onClickViewAllSchedule?: Types.Devlink.RuntimeProps;
  slotUpcomingSchedule?: Types.Devlink.Slot;
  onClickViewAllModule?: Types.Devlink.RuntimeProps;
  slotTrainingModules?: Types.Devlink.Slot;
  textHeader1?: React.ReactNode;
  textHeader2?: React.ReactNode;
  textButton1?: React.ReactNode;
  textButton2?: React.ReactNode;
  isViewButtonVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
