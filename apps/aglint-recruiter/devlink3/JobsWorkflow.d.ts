import * as React from "react";
import * as Types from "./types";

declare function JobsWorkflow(props: {
  as?: React.ElementType;
  slotWorflows?: Types.Devlink.Slot;
  onClickAddWorkflow?: Types.Devlink.RuntimeProps;
  isVisible?: Types.Visibility.VisibilityConditions;
  onClickCreateWorkflow?: Types.Devlink.RuntimeProps;
  slotButtonSoft?: Types.Devlink.Slot;
}): React.JSX.Element;
