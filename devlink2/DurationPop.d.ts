import * as React from "react";
import * as Types from "./types";

declare function DurationPop(props: {
  as?: React.ElementType;
  slotStartTime?: Types.Devlink.Slot;
  slotEndTime?: Types.Devlink.Slot;
  isStartEndVisible?: Types.Visibility.VisibilityConditions;
  onClick30Min?: Types.Devlink.RuntimeProps;
  onClick1Hour?: Types.Devlink.RuntimeProps;
  onClick2Hour?: Types.Devlink.RuntimeProps;
  onClickCustom?: Types.Devlink.RuntimeProps;
  is30MinActive?: Types.Visibility.VisibilityConditions;
  is1HourActive?: Types.Visibility.VisibilityConditions;
  is2HourActive?: Types.Visibility.VisibilityConditions;
  isCustomActive?: Types.Visibility.VisibilityConditions;
  slotCustomDurationInput?: Types.Devlink.Slot;
  isCustomDurationVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
