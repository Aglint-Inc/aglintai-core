import * as React from "react";
import * as Types from "./types";

declare function RequestAgentTab(props: {
  as?: React.ElementType;
  isTabActive?: Types.Visibility.VisibilityConditions;
  onClickTab?: Types.Devlink.RuntimeProps;
  textTab?: React.ReactNode;
}): React.JSX.Element;
