import * as React from "react";
import * as Types from "./types";

declare function CreateNewJob(props: {
  as?: React.ElementType;
  onClickBack?: Types.Devlink.RuntimeProps;
  isSavedChangesVisible?: Types.Visibility.VisibilityConditions;
  onClickPreview?: Types.Devlink.RuntimeProps;
  onClickPublish?: Types.Devlink.RuntimeProps;
  onClickDetails?: Types.Devlink.RuntimeProps;
  isDetailsActive?: Types.Visibility.VisibilityConditions;
  onClickApplyForm?: Types.Devlink.RuntimeProps;
  isApplyFormActive?: Types.Visibility.VisibilityConditions;
  onClickScoreSetting?: Types.Devlink.RuntimeProps;
  isScoreSettingActive?: Types.Visibility.VisibilityConditions;
  onClickEmailTemplates?: Types.Devlink.RuntimeProps;
  isEmailTemplateActive?: Types.Visibility.VisibilityConditions;
  onClickScreeningQuestions?: Types.Devlink.RuntimeProps;
  isScreeningQuestionsActive?: Types.Visibility.VisibilityConditions;
  onClickWorkflows?: Types.Devlink.RuntimeProps;
  isWorkflowsActive?: Types.Visibility.VisibilityConditions;
  slotCreateJob?: Types.Devlink.Slot;
  textJobName?: React.ReactNode;
  textJobEdit?: React.ReactNode;
  slotPublishButton?: Types.Devlink.Slot;
  slotSavedChanges?: Types.Devlink.Slot;
}): React.JSX.Element;
