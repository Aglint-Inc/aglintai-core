import * as React from "react";
import * as Types from "./types";

declare function AvailableTimeRange(props: {
  as?: React.ElementType;
  isActive?: Types.Visibility.VisibilityConditions;
  textTime?: React.ReactNode;
  isSemiActive?: Types.Visibility.VisibilityConditions;
  onClickTime?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
