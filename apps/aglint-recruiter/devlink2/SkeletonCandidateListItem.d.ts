import * as React from "react";
import * as Types from "./types";

declare function SkeletonCandidateListItem(props: {
  as?: React.ElementType;
  isInterviewVisible?: Types.Visibility.VisibilityConditions;
  isScreeningVisible?: Types.Visibility.VisibilityConditions;
  isAssessmentVisible?: Types.Visibility.VisibilityConditions;
  isDisqualifiedVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
