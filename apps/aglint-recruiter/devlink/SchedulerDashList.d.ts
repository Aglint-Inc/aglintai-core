import * as React from "react";
import * as Types from "./types";

declare function SchedulerDashList(props: {
  as?: React.ElementType;
  slotIcon?: Types.Devlink.Slot;
  text?: React.ReactNode;
  isActive?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
