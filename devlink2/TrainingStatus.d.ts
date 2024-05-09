import * as React from "react";
import * as Types from "./types";

declare function TrainingStatus(props: {
  as?: React.ElementType;
  isShadow?: Types.Visibility.VisibilityConditions;
  isReverseShadow?: Types.Visibility.VisibilityConditions;
  isCompletedVisible?: Types.Visibility.VisibilityConditions;
  isPendingApprovalVisible?: Types.Visibility.VisibilityConditions;
  isNotCompletedVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
