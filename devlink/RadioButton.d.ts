import * as React from "react";
import * as Types from "./types";

declare function RadioButton(props: {
  as?: React.ElementType;
  textLabel?: React.ReactNode;
  isChecked?: Types.Visibility.VisibilityConditions;
  onClickCheck?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
