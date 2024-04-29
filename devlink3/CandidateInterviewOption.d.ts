import * as React from "react";
import * as Types from "./types";

declare function CandidateInterviewOption(props: {
  as?: React.ElementType;
  textCurrentStats?: React.ReactNode;
  onClickQualified?: Types.Devlink.RuntimeProps;
  onClickDisqualified?: Types.Devlink.RuntimeProps;
  isDisqualifiedVisible?: Types.Visibility.VisibilityConditions;
  isQualifiedVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
