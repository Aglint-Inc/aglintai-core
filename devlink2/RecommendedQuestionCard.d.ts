import * as React from "react";
import * as Types from "./types";

declare function RecommendedQuestionCard(props: {
  as?: React.ElementType;
  onClickAddQuestion?: Types.Devlink.RuntimeProps;
  textQuestion?: React.ReactNode;
  slotQuestionTypeIcon?: Types.Devlink.Slot;
  textQuestionType?: React.ReactNode;
  textDuration?: React.ReactNode;
}): React.JSX.Element;
