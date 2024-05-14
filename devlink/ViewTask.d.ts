import * as React from "react";
import * as Types from "./types";

declare function ViewTask(props: {
  as?: React.ElementType;
  textRelatedTask?: React.ReactNode;
  textEmailSent?: React.ReactNode;
  onClickViewTask?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
