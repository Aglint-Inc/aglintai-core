import * as React from "react";
import * as Types from "./types";

declare function NewTaskDropdown(props: {
  as?: React.ElementType;
  onClickSchedulerAgent?: Types.Devlink.RuntimeProps;
  onClickJobAssistant?: Types.Devlink.RuntimeProps;
  onClickSourcingAgent?: Types.Devlink.RuntimeProps;
  onClickScreeningAgent?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
