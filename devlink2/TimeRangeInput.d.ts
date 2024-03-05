import * as React from "react";
import * as Types from "./types";

declare function TimeRangeInput(props: {
  as?: React.ElementType;
  slotStartTimeInput?: Types.Devlink.Slot;
  slotEndTimeInput?: Types.Devlink.Slot;
  onClickRemove?: Types.Devlink.RuntimeProps;
  onClickAdd?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
