import * as React from "react";
import * as Types from "./types";

declare function ScheduleReason(props: {
  as?: React.ElementType;
  slotReasonList?: Types.Devlink.Slot;
  slotScheduleReasonSection?: Types.Devlink.Slot;
}): React.JSX.Element;
