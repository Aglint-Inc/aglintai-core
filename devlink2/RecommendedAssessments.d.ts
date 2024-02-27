import * as React from "react";
import * as Types from "./types";

declare function RecommendedAssessments(props: {
  as?: React.ElementType;
  slotIcons?: Types.Devlink.Slot;
  onClickAdd?: Types.Devlink.RuntimeProps;
  textTitle?: React.ReactNode;
  textDesc?: React.ReactNode;
  isIntermediate?: Types.Visibility.VisibilityConditions;
  isExpert?: Types.Visibility.VisibilityConditions;
  isEntryLevel?: Types.Visibility.VisibilityConditions;
  textDuration?: React.ReactNode;
  isSelected?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
