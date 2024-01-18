import * as React from "react";
import * as Types from "./types";

declare function AssessmentSide(props: {
  as?: React.ElementType;
  onClickAssessmentPreview?: Types.Devlink.RuntimeProps;
  onClickDisableAssessment?: Types.Devlink.RuntimeProps;
  isDisableAssessmentVisible?: Types.Visibility.VisibilityConditions;
  textPreview?: React.ReactNode;
  textPreviewButton?: React.ReactNode;
}): React.JSX.Element;
