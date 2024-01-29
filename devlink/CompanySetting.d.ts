import * as React from "react";
import * as Types from "./types";

declare function CompanySetting(props: {
  as?: React.ElementType;
  onClickCompanyInfo?: Types.Devlink.RuntimeProps;
  onClickCompanyJd?: Types.Devlink.RuntimeProps;
  onClickEmailTemplate?: Types.Devlink.RuntimeProps;
  slotCompanyJdSetting?: Types.Devlink.Slot;
  slotEmailTemplate?: Types.Devlink.Slot;
  isSaved?: Types.Visibility.VisibilityConditions;
  isSaving?: Types.Visibility.VisibilityConditions;
  slotSavingLottie?: Types.Devlink.Slot;
  slotTeam?: Types.Devlink.Slot;
  onClickTeam?: Types.Devlink.RuntimeProps;
  isTeamVisible?: Types.Visibility.VisibilityConditions;
  slotAssesmentSetting?: Types.Devlink.Slot;
  onclickAssessment?: Types.Devlink.RuntimeProps;
  onclickAssisstant?: Types.Devlink.RuntimeProps;
  slotAssisstantSettings?: Types.Devlink.Slot;
  isAssessmentBetaVisible?: Types.Visibility.VisibilityConditions;
  isAssistantBetaVisible?: Types.Visibility.VisibilityConditions;
  slotNavSublink?: Types.Devlink.Slot;
  slotCompany?: Types.Devlink.Slot;
  slotSavedChanges?: Types.Devlink.Slot;
}): React.JSX.Element;
