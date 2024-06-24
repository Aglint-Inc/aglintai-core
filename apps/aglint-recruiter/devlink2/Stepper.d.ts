import * as React from "react";
import * as Types from "./types";

declare function Stepper(props: {
  as?: React.ElementType;
  textStepName?: React.ReactNode;
  isLeftLine?: Types.Visibility.VisibilityConditions;
  isRightLine?: Types.Visibility.VisibilityConditions;
  isUpcoming?: Types.Visibility.VisibilityConditions;
  isCurrent?: Types.Visibility.VisibilityConditions;
  isCompleted?: Types.Visibility.VisibilityConditions;
  onClickCompleted?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
