import * as React from "react";
import * as Types from "./types";

declare function CandidateQuestion(props: {
  as?: React.ElementType;
  textQuestionCount?: React.ReactNode;
  textQuestion?: React.ReactNode;
  textRightTitle?: React.ReactNode;
  slotRightInput?: Types.Devlink.Slot;
  isTextRightTitleVisible?: Types.Visibility.VisibilityConditions;
  textQuestionDesc?: React.ReactNode;
  isQuestionDescVisibe?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
