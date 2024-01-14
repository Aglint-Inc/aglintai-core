import * as React from "react";
import * as Types from "./types";

declare function ToggleButton(props: {
  as?: React.ElementType;
  onclickToggle?: Types.Devlink.RuntimeProps;
  isInactive?: Types.Visibility.VisibilityConditions;
  isActive?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
