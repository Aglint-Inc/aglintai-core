import * as React from "react";
import * as Types from "./types";

declare function ScheduleProgressPill(props: {
  as?: React.ElementType;
  isStarting?: Types.Visibility.VisibilityConditions;
  isEnding?: Types.Visibility.VisibilityConditions;
  slotProgressIcon?: Types.Devlink.Slot;
  styleBgColor?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
