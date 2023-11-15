import * as React from "react";
import * as Types from "./types";

declare function JobDetailsSortOption(props: {
  as?: React.ElementType;
  title?: React.ReactNode;
  onclickAscending?: Types.Devlink.RuntimeProps;
  onclickDescending?: Types.Devlink.RuntimeProps;
  isAscending?: Types.Visibility.VisibilityConditions;
  isDescending?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
