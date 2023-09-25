import * as React from "react";
import * as Types from "./types";

declare function NotificationError(props: {
  as?: React.ElementType;
  notificationWarningHeader?: React.ReactNode;
  notificationWarningPara?: React.ReactNode;
}): React.JSX.Element;
