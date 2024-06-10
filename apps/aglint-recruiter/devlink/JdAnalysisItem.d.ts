import * as React from "react";
import * as Types from "./types";

declare function JdAnalysisItem(props: {
  as?: React.ElementType;
  textBadge?: React.ReactNode;
  textAnalysis?: React.ReactNode;
  isHigh?: Types.Visibility.VisibilityConditions;
  isPoor?: Types.Visibility.VisibilityConditions;
  isMedium?: Types.Visibility.VisibilityConditions;
  textTitle?: React.ReactNode;
}): React.JSX.Element;
