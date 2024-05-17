import * as React from "react";
import * as Types from "./types";

declare function ShowFilterButton(props: {
  as?: React.ElementType;
  onClickFilter?: Types.Devlink.RuntimeProps;
  isShowTextVisible?: Types.Visibility.VisibilityConditions;
  isHideTextVisible?: Types.Visibility.VisibilityConditions;
  isDotVisible?: Types.Visibility.VisibilityConditions;
  propsArrowRotate?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
