import * as React from "react";
import * as Types from "./types";

declare function SelectActionsDropdown(props: {
  as?: React.ElementType;
  isInterview?: Types.Visibility.VisibilityConditions;
  onClickInterview?: Types.Devlink.RuntimeProps;
  isQualified?: Types.Visibility.VisibilityConditions;
  onClickQualified?: Types.Devlink.RuntimeProps;
  isDisqualified?: Types.Visibility.VisibilityConditions;
  onClickDisqualified?: Types.Devlink.RuntimeProps;
  isMoveNew?: Types.Visibility.VisibilityConditions;
  onClickMoveNew?: Types.Devlink.RuntimeProps;
  isScreening?: Types.Visibility.VisibilityConditions;
  onClickScreening?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
