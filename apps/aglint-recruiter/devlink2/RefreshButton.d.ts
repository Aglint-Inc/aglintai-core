import * as React from "react";
import * as Types from "./types";

declare function RefreshButton(props: {
  as?: React.ElementType;
  text?: React.ReactNode;
  iconProps?: Types.Devlink.RuntimeProps;
  buttonProps?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
