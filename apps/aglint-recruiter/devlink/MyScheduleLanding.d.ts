import * as React from "react";
import * as Types from "./types";

declare function MyScheduleLanding(props: {
  as?: React.ElementType;
  onClickConnectCalender?: Types.Devlink.RuntimeProps;
  isConnectCalenderVisible?: Types.Visibility.VisibilityConditions;
  isConnectedVisible?: Types.Visibility.VisibilityConditions;
  textConnectedTo?: React.ReactNode;
}): React.JSX.Element;
