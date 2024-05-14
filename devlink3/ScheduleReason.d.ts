import * as React from "react";
import * as Types from "./types";

declare function ScheduleReason(props: {
  as?: React.ElementType;
  slotReasonList?: Types.Devlink.Slot;
  slotScheduleReasonSection?: Types.Devlink.Slot;
  sloNewTabPill?: Types.Devlink.Slot;
  textMainHeading?: React.ReactNode;
  textMainHelperText?: React.ReactNode;
  isMainHeadingVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
