import * as React from "react";
import * as Types from "./types";

declare function SuggestedActions(props: {
  as?: React.ElementType;
  isActive?: Types.Visibility.VisibilityConditions;
  textSuggestion?: React.ReactNode;
}): React.JSX.Element;
