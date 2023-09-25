import * as React from "react";
import * as Types from "./types";

declare function MobileLinkDashBoard(props: {
  as?: React.ElementType;
  isDashboard?: Types.Visibility.VisibilityConditions;
  onClickDashBoard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
