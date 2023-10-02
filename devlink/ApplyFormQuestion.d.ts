import * as React from "react";
import * as Types from "./types";

declare function ApplyFormQuestion(props: {
  as?: React.ElementType;
  textQuestion?: React.ReactNode;
  onClickEditQuestions?: Types.Devlink.RuntimeProps;
  onClickRemove?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
