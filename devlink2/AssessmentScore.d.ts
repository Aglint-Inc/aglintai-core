import * as React from "react";
import * as Types from "./types";

declare function AssessmentScore(props: {
  as?: React.ElementType;
  textScore?: React.ReactNode;
  props?: Types.Devlink.RuntimeProps;
  isError?: Types.Visibility.VisibilityConditions;
  isScoreVisible?: Types.Visibility.VisibilityConditions;
  isDurationVisible?: Types.Visibility.VisibilityConditions;
  textDuration?: React.ReactNode;
}): React.JSX.Element;
