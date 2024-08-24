import * as React from "react";
import * as Types from "./types";

declare function WorkflowJobs(props: {
  as?: React.ElementType;
  slotWorkflowCards?: Types.Devlink.Slot;
  slotWorkflowPreview?: Types.Devlink.Slot;
}): React.JSX.Element;
