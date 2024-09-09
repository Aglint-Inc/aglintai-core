import * as React from "react";
import * as Types from "./types";

declare function AssessmentQuestion(props: {
  as?: React.ElementType;
  textQuestionCount?: React.ReactNode;
  slotAssessmentQuestion?: Types.Devlink.Slot;
  slotWarning?: Types.Devlink.Slot;
  isWarningVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;