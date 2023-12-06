import * as React from "react";
import * as Types from "./types";

declare function ConnectedMail(props: {
  as?: React.ElementType;
  isOutlookIconVisible?: Types.Visibility.VisibilityConditions;
  isGmailIconVisible?: Types.Visibility.VisibilityConditions;
  textConnectedMailid?: React.ReactNode;
}): React.JSX.Element;
