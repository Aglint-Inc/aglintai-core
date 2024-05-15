import * as React from "react";
import * as Types from "./types";

declare function Checkbox(props: {
  as?: React.ElementType;
  textLabel?: React.ReactNode;
  textDescription?: React.ReactNode;
  onClickCheck?: Types.Devlink.RuntimeProps;
  isChecked?: Types.Visibility.VisibilityConditions;
  isLabelDescriptionVisible?: Types.Visibility.VisibilityConditions;
  isSingleLineLabelVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
