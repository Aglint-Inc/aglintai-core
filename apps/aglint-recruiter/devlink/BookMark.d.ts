import * as React from "react";
import * as Types from "./types";

declare function BookMark(props: {
  as?: React.ElementType;
  onClickBookmark?: Types.Devlink.RuntimeProps;
  isBookMarked?: Types.Visibility.VisibilityConditions;
  isDarkIconVisible?: Types.Visibility.VisibilityConditions;
  isLightIconVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
