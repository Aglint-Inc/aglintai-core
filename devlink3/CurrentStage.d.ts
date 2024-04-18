import * as React from "react";
import * as Types from "./types";

declare function CurrentStage(props: {
  as?: React.ElementType;
  textStage?: React.ReactNode;
  onClickMoveToQualified?: Types.Devlink.RuntimeProps;
  onClickMoveToDisqualified?: Types.Devlink.RuntimeProps;
  isDisqualifiedVisible?: Types.Visibility.VisibilityConditions;
  isQualifiedVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
