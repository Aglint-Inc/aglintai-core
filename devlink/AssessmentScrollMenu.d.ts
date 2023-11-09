import * as React from "react";
import * as Types from "./types";

declare function AssessmentScrollMenu(props: {
  as?: React.ElementType;
  isInstructionActive?: Types.Visibility.VisibilityConditions;
  isAssessmentActive?: Types.Visibility.VisibilityConditions;
  isWelcomeActive?: Types.Visibility.VisibilityConditions;
  isAssessmentQuestionActive?: Types.Visibility.VisibilityConditions;
  isEpilogueActive?: Types.Visibility.VisibilityConditions;
  onClickInstructions?: Types.Devlink.RuntimeProps;
  onClickAssessmentMode?: Types.Devlink.RuntimeProps;
  onClickWelcome?: Types.Devlink.RuntimeProps;
  onClickAssessmentQuestions?: Types.Devlink.RuntimeProps;
  onClickEpilogue?: Types.Devlink.RuntimeProps;
  onClickPreview?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
