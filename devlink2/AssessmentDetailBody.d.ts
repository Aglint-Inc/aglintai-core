import * as React from "react";
import * as Types from "./types";

declare function AssessmentDetailBody(props: {
  as?: React.ElementType;
  slotDuration?: Types.Devlink.Slot;
  slotQuestionCards?: Types.Devlink.Slot;
  onClickAddQuestion?: Types.Devlink.RuntimeProps;
  textQuestionNumber?: React.ReactNode;
  slotQuestionDetail?: Types.Devlink.Slot;
  slotRecommendedQuestions?: Types.Devlink.Slot;
  isQuestionTopBar?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
