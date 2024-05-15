import * as React from "react";
import * as Types from "./types";

declare function ScheduleWithAgent(props: {
  as?: React.ElementType;
  onClickPhoneAgent?: Types.Devlink.RuntimeProps;
  onClickEmailAgent?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
