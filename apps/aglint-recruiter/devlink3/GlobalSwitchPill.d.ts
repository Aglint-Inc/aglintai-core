import * as React from "react";
import * as Types from "./types";

declare function GlobalSwitchPill(props: {
  as?: React.ElementType;
  textPill?: React.ReactNode;
  isActive?: Types.Visibility.VisibilityConditions;
  onClickPill?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
