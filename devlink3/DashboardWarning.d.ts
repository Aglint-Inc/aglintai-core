import * as React from "react";
import * as Types from "./types";

declare function DashboardWarning(props: {
  as?: React.ElementType;
  onClickDismiss?: Types.Devlink.RuntimeProps;
  onClickView?: Types.Devlink.RuntimeProps;
  textWarningTitle?: React.ReactNode;
  textDesc?: React.ReactNode;
}): React.JSX.Element;
