import * as React from "react";
import * as Types from "./types";

declare function WorkingHours(props: {
  as?: React.ElementType;
  slotTimeZoneToggle?: Types.Devlink.Slot;
  slotTimeZoneInput?: Types.Devlink.Slot;
  slotWorkingHourDay?: Types.Devlink.Slot;
}): React.JSX.Element;
