import * as React from "react";
import * as Types from "./types";

declare function JobStatus(props: {
  as?: React.ElementType;
  title?: React.ReactNode;
  isScheduled?: Types.Visibility.VisibilityConditions;
  isActive?: Types.Visibility.VisibilityConditions;
  isInactive?: Types.Visibility.VisibilityConditions;
  onClickStatus?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
