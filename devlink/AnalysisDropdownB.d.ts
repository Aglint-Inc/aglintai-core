import * as React from "react";
import * as Types from "./types";

declare function AnalysisDropdownB(props: {
  as?: React.ElementType;
  dropdownTitle?: React.ReactNode;
  isHigh?: Types.Visibility.VisibilityConditions;
  isLow?: Types.Visibility.VisibilityConditions;
  isMedium?: Types.Visibility.VisibilityConditions;
  isPositive?: Types.Visibility.VisibilityConditions;
  isNegative?: Types.Visibility.VisibilityConditions;
  overviewText?: React.ReactNode;
  summaryText?: React.ReactNode;
}): React.JSX.Element;
