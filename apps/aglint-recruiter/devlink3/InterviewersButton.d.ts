import * as React from "react";
import * as Types from "./types";

declare function InterviewersButton(props: {
  as?: React.ElementType;
  isQualifiedActive?: Types.Visibility.VisibilityConditions;
  onClickQualified?: Types.Devlink.RuntimeProps;
  onClickTraining?: Types.Devlink.RuntimeProps;
  isTrainingActive?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
