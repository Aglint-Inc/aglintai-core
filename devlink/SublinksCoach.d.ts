import * as React from "react";
import * as Types from "./types";

declare function SublinksCoach(props: {
  as?: React.ElementType;
  isAskCoach?: Types.Visibility.VisibilityConditions;
  isMyCoach?: Types.Visibility.VisibilityConditions;
  isSuggestedByCoach?: Types.Visibility.VisibilityConditions;
  isPlanDetails?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
