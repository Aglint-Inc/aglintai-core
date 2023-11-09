import * as React from "react";
import * as Types from "./types";

declare function ScreeningQuestion(props: {
  as?: React.ElementType;
  onClickUploadVideo?: Types.Devlink.RuntimeProps;
  slotToggleAssessment?: Types.Devlink.Slot;
  slotWelcomeMessage?: Types.Devlink.Slot;
  slotIntroductionVideo?: Types.Devlink.Slot;
  slotEndingMessageVideo?: Types.Devlink.Slot;
  slotAssessmentQuestion?: Types.Devlink.Slot;
  textQuestionCount?: React.ReactNode;
  slotUpload?: Types.Devlink.Slot;
  slotInstructionsBrief?: Types.Devlink.Slot;
  slotRightScrollMenu?: Types.Devlink.Slot;
  onClickGenerateAi?: Types.Devlink.RuntimeProps;
  onClickUpload?: Types.Devlink.RuntimeProps;
  isGenerateWithAiChecked?: Types.Visibility.VisibilityConditions;
  isUploadChecked?: Types.Visibility.VisibilityConditions;
  slotToggleInstructionVideo?: Types.Devlink.Slot;
  isUploadVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
