import * as React from "react";
import * as Types from "./types";

declare function WorkflowLanding(props: {
  as?: React.ElementType;
  slotWorkflowCard?: Types.Devlink.Slot;
  slotSearchAndFilter?: Types.Devlink.Slot;
  onClickClose?: Types.Devlink.Slot;
  styleWidth?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
