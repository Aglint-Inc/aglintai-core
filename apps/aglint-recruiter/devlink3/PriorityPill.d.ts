import * as React from "react";
import * as Types from "./types";

declare function PriorityPill(props: {
  as?: React.ElementType;
  isHighVisible?: Types.Visibility.VisibilityConditions;
  isLowVisible?: Types.Visibility.VisibilityConditions;
  isMediumVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
