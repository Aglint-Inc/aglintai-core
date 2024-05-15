import * as React from "react";
import * as Types from "./types";

declare function NewJobStep4(props: {
  as?: React.ElementType;
  slotInterviewWorkflow?: Types.Devlink.Slot;
  slotInterviewEmail?: Types.Devlink.Slot;
  slotApplicationWorkflow?: Types.Devlink.Slot;
  slotDisqualifyEmail?: Types.Devlink.Slot;
  isAssessmentScoringVisible?: Types.Visibility.VisibilityConditions;
  isEmailScheduleVisible?: Types.Visibility.VisibilityConditions;
  isWorkflowInfoVisible?: Types.Visibility.VisibilityConditions;
  isWorkflowContentVisible?: Types.Visibility.VisibilityConditions;
  slotWarning?: Types.Devlink.Slot;
  isWarningVisible?: Types.Visibility.VisibilityConditions;
  showDetails?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
