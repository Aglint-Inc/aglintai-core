import * as React from "react";
import * as Types from "./types";

declare function AgentTask(props: {
  as?: React.ElementType;
  onClickCard?: Types.Devlink.RuntimeProps;
  isActive?: Types.Visibility.VisibilityConditions;
  textTaskName?: React.ReactNode;
  slotTaskIcon?: Types.Devlink.Slot;
}): React.JSX.Element;
