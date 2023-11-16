import * as React from "react";
import * as Types from "./types";

declare function SelectActionBar(props: {
  as?: React.ElementType;
  isInterview?: Types.Visibility.VisibilityConditions;
  isQualified?: Types.Visibility.VisibilityConditions;
  isDisqualified?: Types.Visibility.VisibilityConditions;
  onClickDisqualified?: Types.Devlink.RuntimeProps;
  onClickQualified?: Types.Devlink.RuntimeProps;
  onClickInterview?: Types.Devlink.RuntimeProps;
  onClickMoveNew?: Types.Devlink.RuntimeProps;
  isMoveNew?: Types.Visibility.VisibilityConditions;
  onClickClear?: Types.Devlink.RuntimeProps;
  textSelected?: React.ReactNode;
  selectAllText?: React.ReactNode;
  isSelectAllVisible?: Types.Visibility.VisibilityConditions;
  onclickSelectAll?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
