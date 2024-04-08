import * as React from "react";
import * as Types from "./types";

declare function ScheduleTabFeedback(props: {
  as?: React.ElementType;
  slotFeedbackTableRow?: Types.Devlink.Slot;
  isSessionVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
