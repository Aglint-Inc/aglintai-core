import * as React from "react";
import * as Types from "./types";

declare function AssessmentQuestions(props: {
  as?: React.ElementType;
  textQuestionHeader?: React.ReactNode;
  textQuestionCount?: React.ReactNode;
  slotQuestionVideo?: Types.Devlink.Slot;
  onClickAddManually?: Types.Devlink.RuntimeProps;
  onClickAddAi?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
