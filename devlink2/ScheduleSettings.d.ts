import * as React from "react";
import * as Types from "./types";

declare function ScheduleSettings(props: {
  as?: React.ElementType;
  slotTimeZoneToggle?: Types.Devlink.Slot;
  slotTimeZoneInput?: Types.Devlink.Slot;
  slotDailyLimit?: Types.Devlink.Slot;
  slotWeeklyLimit?: Types.Devlink.Slot;
  slotWorkingHourDay?: Types.Devlink.Slot;
  slotDayOff?: Types.Devlink.Slot;
  onClickAddDate?: Types.Devlink.RuntimeProps;
  isTimeZoneToggleVisible?: Types.Visibility.VisibilityConditions;
  onClickDiscard?: Types.Devlink.RuntimeProps;
  onClickUpdateChanges?: Types.Devlink.RuntimeProps;
  slotKeywordCard?: Types.Devlink.Slot;
  isKeywordVisible?: Types.Visibility.VisibilityConditions;
  isCompanyLevelVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
