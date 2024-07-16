import * as React from "react";
import * as Types from "./types";

declare function WorkflowDetail(props: {
  as?: React.ElementType;
  slotWorkflowItem?: Types.Devlink.Slot;
  slotConnectedJobs?: Types.Devlink.Slot;
}): React.JSX.Element;
