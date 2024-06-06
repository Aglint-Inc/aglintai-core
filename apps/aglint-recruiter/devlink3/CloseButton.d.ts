import * as React from "react";
import * as Types from "./types";

declare function CloseButton(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  isWithoutBorder?: Types.Visibility.VisibilityConditions;
  isWithBorder?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
