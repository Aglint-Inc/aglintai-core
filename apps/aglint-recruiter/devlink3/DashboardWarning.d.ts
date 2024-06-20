import * as React from "react";
import * as Types from "./types";

declare function DashboardWarning(props: {
  as?: React.ElementType;
  textWarningTitle?: React.ReactNode;
  textDesc?: React.ReactNode;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
