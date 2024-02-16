import * as React from "react";
import * as Types from "./types";

declare function JobDetailsTabs(props: {
  as?: React.ElementType;
  onClickNew?: Types.Devlink.RuntimeProps;
  countNew?: React.ReactNode;
  onClickAssessment?: Types.Devlink.RuntimeProps;
  countAssessment?: React.ReactNode;
  onClickQualified?: Types.Devlink.RuntimeProps;
  countQualified?: React.ReactNode;
  onClickDisqualified?: Types.Devlink.RuntimeProps;
  countDisqualified?: React.ReactNode;
  isNewSelected?: Types.Visibility.VisibilityConditions;
  isAssessmentSelected?: Types.Visibility.VisibilityConditions;
  isQualifiedSelected?: Types.Visibility.VisibilityConditions;
  isDisqualifiedSelected?: Types.Visibility.VisibilityConditions;
  isAssessmentVisible?: Types.Visibility.VisibilityConditions;
  onClickScreening?: Types.Devlink.RuntimeProps;
  countScreening?: React.ReactNode;
  isScreeningSelected?: Types.Visibility.VisibilityConditions;
  isScreeningVisible?: Types.Visibility.VisibilityConditions;
  isInterviewSelected?: Types.Visibility.VisibilityConditions;
  onClickInterview?: Types.Devlink.RuntimeProps;
  countInterview?: React.ReactNode;
  isInterviewVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
