import * as React from "react";
import * as Types from "./types";

declare function TimeRangeSelector(props: {
  as?: React.ElementType;
  slotCheckbox?: Types.Devlink.Slot;
  textDay?: React.ReactNode;
  isMultiDay?: Types.Visibility.VisibilityConditions;
  slotSelectedTime?: Types.Devlink.Slot;
  slotTimeinputs?: Types.Devlink.Slot;
  onClickAdd?: Types.Devlink.RuntimeProps;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
