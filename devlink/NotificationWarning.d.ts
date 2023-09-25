import * as React from "react";
import * as Types from "./types";

declare function NotificationWarning(props: {
  as?: React.ElementType;
  notificationHeaderWarning?: React.ReactNode;
  notificationParaWarning?: React.ReactNode;
}): React.JSX.Element;
