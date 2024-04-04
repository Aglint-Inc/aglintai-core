import * as React from "react";
import * as Types from "./types";

declare function InterviewMode(props: {
  as?: React.ElementType;
  slotInterviewModePill?: Types.Devlink.Slot;
  slotInterviewersAvatarSelectionPill?: Types.Devlink.Slot;
  slotInterviewersDropdown?: Types.Devlink.Slot;
  isPanel?: Types.Visibility.VisibilityConditions;
  slotMemberCountDropdown?: Types.Devlink.Slot;
  isIndividual?: Types.Visibility.VisibilityConditions;
  slotToggle?: Types.Devlink.Slot;
  textToggleLabel?: React.ReactNode;
  isTraining?: Types.Visibility.VisibilityConditions;
  slotTraineeAvatarSelectionPill?: Types.Devlink.Slot;
  slotTraineesDropdown?: Types.Devlink.Slot;
  isInterviewerDropVisible?: Types.Visibility.VisibilityConditions;
  isTrainingVisible?: Types.Visibility.VisibilityConditions;
  isTraineesDropVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
