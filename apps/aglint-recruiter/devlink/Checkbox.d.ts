import * as React from "react";
import * as Types from "./types";

declare function Checkbox(props: {
  as?: React.ElementType;
  onClickCheck?: Types.Devlink.RuntimeProps;
  isChecked?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
