import * as React from "react";
import * as Types from "./types";

declare function CandidateSidedrawerTop(props: {
  as?: React.ElementType;
  isDownArrowEnable?: Types.Visibility.VisibilityConditions;
  isUpArrowEnable?: Types.Visibility.VisibilityConditions;
  onClickBookMark?: Types.Devlink.RuntimeProps;
  isBookmarked?: Types.Visibility.VisibilityConditions;
  onClickUp?: Types.Devlink.RuntimeProps;
  onClickDown?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
