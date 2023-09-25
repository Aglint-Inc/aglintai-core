import * as React from "react";
import * as Types from "./types";

declare function MobileLinkCoach(props: {
  as?: React.ElementType;
  isCoach?: Types.Visibility.VisibilityConditions;
  onClickCoach?: Types.Devlink.RuntimeProps;
  isPro?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
