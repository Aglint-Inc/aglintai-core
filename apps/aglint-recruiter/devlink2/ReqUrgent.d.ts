import * as React from "react";
import * as Types from "./types";

declare function ReqUrgent(props: {
  as?: React.ElementType;
  textRequests?: React.ReactNode;
  onClickUrgentRequest?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
