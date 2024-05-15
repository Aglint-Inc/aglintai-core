import * as React from "react";
import * as Types from "./types";

declare function StatusBadge(props: {
  as?: React.ElementType;
  isCompletedVisible?: Types.Visibility.VisibilityConditions;
  isConfirmedVisible?: Types.Visibility.VisibilityConditions;
  isNotScheduledVisible?: Types.Visibility.VisibilityConditions;
  isInProgressVisible?: Types.Visibility.VisibilityConditions;
  isCancelledVisible?: Types.Visibility.VisibilityConditions;
  isWaitingVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
