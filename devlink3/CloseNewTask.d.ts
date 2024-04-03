import * as React from "react";
import * as Types from "./types";

declare function CloseNewTask(props: {
  as?: React.ElementType;
  onClickSave?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
