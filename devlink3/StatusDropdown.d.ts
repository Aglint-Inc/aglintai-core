import * as React from "react";
import * as Types from "./types";

declare function StatusDropdown(props: {
  as?: React.ElementType;
  onClickDone?: Types.Devlink.RuntimeProps;
  isDoneVisible?: Types.Visibility.VisibilityConditions;
  onClickInProgress?: Types.Devlink.RuntimeProps;
  isInProgressVisible?: Types.Visibility.VisibilityConditions;
  onClickNotStarted?: Types.Devlink.RuntimeProps;
  isNotStartedVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
