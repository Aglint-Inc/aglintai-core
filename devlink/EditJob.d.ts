import * as React from "react";
import * as Types from "./types";

declare function EditJob(props: {
  as?: React.ElementType;
  isJobSaved?: Types.Visibility.VisibilityConditions;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotDetails?: Types.Devlink.Slot;
  onClickDetails?: Types.Devlink.RuntimeProps;
  onClickEmailTemplates?: Types.Devlink.RuntimeProps;
  onClickApplyForm?: Types.Devlink.RuntimeProps;
  onClickScreeningQuestion?: Types.Devlink.RuntimeProps;
  onClickWorkFlows?: Types.Devlink.RuntimeProps;
  slotLoaderSaving?: Types.Devlink.Slot;
  isWarningVisibles?: Types.Visibility.VisibilityConditions;
  isDetailsActive?: Types.Visibility.VisibilityConditions;
  isEmailTemplatesActive?: Types.Visibility.VisibilityConditions;
  isScreeningQuestionsActive?: Types.Visibility.VisibilityConditions;
  isWorkflowActive?: Types.Visibility.VisibilityConditions;
  onClickGotIt?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
