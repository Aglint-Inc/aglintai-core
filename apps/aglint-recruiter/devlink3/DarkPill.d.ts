import * as React from "react";
import * as Types from "./types";

declare function DarkPill(props: {
  as?: React.ElementType;
  isActive?: Types.Visibility.VisibilityConditions;
  textPill?: React.ReactNode;
  onClickPill?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
