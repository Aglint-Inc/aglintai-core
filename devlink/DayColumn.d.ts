import * as React from "react";
import * as Types from "./types";

declare function DayColumn(props: {
  as?: React.ElementType;
  slotAvailableTimeRange?: Types.Devlink.Slot;
  textDate?: React.ReactNode;
  textDay?: React.ReactNode;
}): React.JSX.Element;
