import * as React from "react";
import * as Types from "./types";

declare function WorkflowCard(props: {
  as?: React.ElementType;
  textWorkflowTrigger?: React.ReactNode;
  textJobs?: React.ReactNode;
  textWorkflowName?: React.ReactNode;
  onClickEdit?: Types.Devlink.RuntimeProps;
  onClickDelete?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
