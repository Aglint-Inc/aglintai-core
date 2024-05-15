import * as React from "react";
import * as Types from "./types";

declare function ScheduleDetailTabs(props: {
  as?: React.ElementType;
  slotDarkPills?: Types.Devlink.Slot;
  slotTabContent?: Types.Devlink.Slot;
  slotScheduleTabOverview?: Types.Devlink.Slot;
}): React.JSX.Element;
