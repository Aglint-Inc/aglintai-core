import * as React from "react";
import * as Types from "./types";

declare function SublinkTab(props: {
  as?: React.ElementType;
  text?: React.ReactNode;
  isActtive?: Types.Visibility.VisibilityConditions;
  onClickTab?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
