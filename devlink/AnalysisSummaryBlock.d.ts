import * as React from "react";
import * as Types from "./types";

declare function AnalysisSummaryBlock(props: {
  as?: React.ElementType;
  analysisHeader?: React.ReactNode;
  analysisSummary?: React.ReactNode;
  analysisScore?: Types.Devlink.Slot;
  fullAnalysisBtnProps?: Types.Devlink.RuntimeProps;
  isButtonVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
