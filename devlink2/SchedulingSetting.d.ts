import * as React from "react";
import * as Types from "./types";

declare function SchedulingSetting(props: {
  as?: React.ElementType;
  slotToggleTimeZone?: Types.Devlink.Slot;
  slotInputTimeZone?: Types.Devlink.Slot;
  slotDailyLimit?: Types.Devlink.Slot;
  slotWeeklyLimit?: Types.Devlink.Slot;
  onClickReset?: Types.Devlink.RuntimeProps;
  slotWorkingHours?: Types.Devlink.Slot;
  slotToggleCompanyDays?: Types.Devlink.Slot;
  slotDateList?: Types.Devlink.Slot;
  onClickAddDaysOff?: Types.Devlink.RuntimeProps;
  onClickDiscard?: Types.Devlink.RuntimeProps;
  onClickUpdateChanges?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
