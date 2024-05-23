import * as React from "react";
import * as Types from "./types";

declare function RadioWithText(props: {
  as?: React.ElementType;
  isSelected?: Types.Visibility.VisibilityConditions;
  textRadio?: React.ReactNode;
  onClickRadio?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
