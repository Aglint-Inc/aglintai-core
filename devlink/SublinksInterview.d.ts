import * as React from "react";
import * as Types from "./types";

declare function SublinksInterview(props: {
  as?: React.ElementType;
  isTakeInterview?: Types.Visibility.VisibilityConditions;
  isInterviewHistory?: Types.Visibility.VisibilityConditions;
  isCommonlyAskedQuestions?: Types.Visibility.VisibilityConditions;
  onClickCommonlyAskedQuestions?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
