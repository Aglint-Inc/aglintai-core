import * as React from "react";
import * as Types from "./types";

declare function InterviewerDetailOverview(props: {
  as?: React.ElementType;
  slotUpcomingSchedule?: Types.Devlink.Slot;
  slotTrainingModules?: Types.Devlink.Slot;
  textHeader1?: React.ReactNode;
  textHeader2?: React.ReactNode;
  isViewButtonVisible?: Types.Visibility.VisibilityConditions;
  slotButtonSchedule?: Types.Devlink.Slot;
  slotButtonTraining?: Types.Devlink.Slot;
  isTrainingVisible?: Types.Visibility.VisibilityConditions;
  isUpcomingVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
