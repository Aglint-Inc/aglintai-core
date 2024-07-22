import * as React from "react";
import * as Types from "./types";

declare function ScheduleTabFeedback(props: {
  as?: React.ElementType;
  slotFeedbackTableRow?: Types.Devlink.Slot;
  isSessionVisible?: Types.Visibility.VisibilityConditions;
  styleMinWidth?: Types.Devlink.RuntimeProps;
  border?: Types.Builtin.Text;
}): React.JSX.Element;
