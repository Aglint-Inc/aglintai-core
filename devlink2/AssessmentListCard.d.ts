import * as React from "react";
import * as Types from "./types";

declare function AssessmentListCard(props: {
  as?: React.ElementType;
  slotIcons?: Types.Devlink.Slot;
  textTitle?: React.ReactNode;
  textQuestionCount?: React.ReactNode;
  onClickRemove?: Types.Devlink.RuntimeProps;
  isRemoveVisible?: Types.Visibility.VisibilityConditions;
  isActive?: Types.Visibility.VisibilityConditions;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
