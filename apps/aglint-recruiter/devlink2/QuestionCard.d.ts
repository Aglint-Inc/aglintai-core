import * as React from "react";
import * as Types from "./types";

declare function QuestionCard(props: {
  as?: React.ElementType;
  isActive?: Types.Visibility.VisibilityConditions;
  isSelected?: Types.Visibility.VisibilityConditions;
  onClickQuestion?: Types.Devlink.RuntimeProps;
  slotQuestionTypeIcon?: Types.Devlink.Slot;
  textQuestionType?: React.ReactNode;
  textDuration?: React.ReactNode;
  textQuestion?: React.ReactNode;
  isDropping?: Types.Visibility.VisibilityConditions;
  isReordering?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
