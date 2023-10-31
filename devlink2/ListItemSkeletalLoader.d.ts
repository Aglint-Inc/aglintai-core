import * as React from "react";
import * as Types from "./types";

declare function ListItemSkeletalLoader(props: {
  as?: React.ElementType;
  isListTopBarVisible?: Types.Visibility.VisibilityConditions;
  onclickSelectAll?: Types.Devlink.RuntimeProps;
  isInterviewVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
