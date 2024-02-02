import * as React from "react";
import * as Types from "./types";

declare function AssistStatus(props: {
  as?: React.ElementType;
  isPublishedVisible?: Types.Visibility.VisibilityConditions;
  isDraftVisible?: Types.Visibility.VisibilityConditions;
  isCloseVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
