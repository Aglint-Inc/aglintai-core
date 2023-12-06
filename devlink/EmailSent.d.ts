import * as React from "react";
import * as Types from "./types";

declare function EmailSent(props: {
  as?: React.ElementType;
  onClickOpenInbox?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
