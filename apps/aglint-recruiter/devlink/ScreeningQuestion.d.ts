import * as React from "react";
import * as Types from "./types";

declare function ScreeningQuestion(props: {
  as?: React.ElementType;
  slotUpload?: Types.Devlink.Slot;
  slotInstructionsBrief?: Types.Devlink.Slot;
  onClickGenerateAi?: Types.Devlink.RuntimeProps;
  onClickUpload?: Types.Devlink.RuntimeProps;
  isGenerateWithAiChecked?: Types.Visibility.VisibilityConditions;
  isUploadChecked?: Types.Visibility.VisibilityConditions;
  slotToggleInstructionVideo?: Types.Devlink.Slot;
  isUploadVisible?: Types.Visibility.VisibilityConditions;
  slotWarning?: Types.Devlink.Slot;
  isWarningVisible?: Types.Visibility.VisibilityConditions;
  isRadioVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
