import * as React from "react";
import * as Types from "./types";

declare function ReqCompleted(props: {
  as?: React.ElementType;
  textTitle?: React.ReactNode;
  onClickCompleted?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
