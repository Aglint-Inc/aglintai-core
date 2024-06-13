import * as React from "react";
import * as Types from "./types";

declare function ApplicantsTable(props: {
  as?: React.ElementType;
  onClickSelectAll?: Types.Devlink.RuntimeProps;
  isAllChecked?: Types.Visibility.VisibilityConditions;
  isScreeningVisible?: Types.Visibility.VisibilityConditions;
  isInterviewVisible?: Types.Visibility.VisibilityConditions;
  isDisqualifiedVisible?: Types.Visibility.VisibilityConditions;
  propsDrag?: Types.Devlink.RuntimeProps;
  isDragVisible?: Types.Visibility.VisibilityConditions;
  isAssessmentVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
