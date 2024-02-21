import * as React from "react";
import * as Types from "./types";

declare function AgentTask(props: {
  as?: React.ElementType;
  slotTimeline?: Types.Devlink.Slot;
  textTaskName?: React.ReactNode;
  onClickCard?: Types.Devlink.RuntimeProps;
  isActive?: Types.Visibility.VisibilityConditions;
  isTimeline?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
