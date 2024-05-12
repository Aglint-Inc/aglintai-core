import * as React from "react";
import * as Types from "./types";

declare function SelectButton(props: {
  as?: React.ElementType;
  isSelected?: Types.Visibility.VisibilityConditions;
  textButton?: React.ReactNode;
  onClickButton?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
