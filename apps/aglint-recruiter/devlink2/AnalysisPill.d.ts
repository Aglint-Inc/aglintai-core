import * as React from "react";
import * as Types from "./types";

declare function AnalysisPill(props: {
  as?: React.ElementType;
  isHigh?: Types.Visibility.VisibilityConditions;
  isAverage?: Types.Visibility.VisibilityConditions;
  isPoor?: Types.Visibility.VisibilityConditions;
  score?: React.ReactNode;
  scoreProps?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
