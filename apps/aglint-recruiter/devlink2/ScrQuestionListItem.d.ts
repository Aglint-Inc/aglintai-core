import * as React from "react";
import * as Types from "./types";

declare function ScrQuestionListItem(props: {
  as?: React.ElementType;
  isMultiselect?: Types.Visibility.VisibilityConditions;
  isSingleSelect?: Types.Visibility.VisibilityConditions;
  isShortAnswer?: Types.Visibility.VisibilityConditions;
  questionText?: React.ReactNode;
  answerText?: React.ReactNode;
}): React.JSX.Element;
