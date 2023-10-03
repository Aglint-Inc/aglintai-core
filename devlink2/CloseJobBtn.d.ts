import * as React from "react";
import * as Types from "./types";

declare function CloseJobBtn(props: {
  as?: React.ElementType;
  onClick?: Types.Devlink.RuntimeProps;
  isDisabled?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
