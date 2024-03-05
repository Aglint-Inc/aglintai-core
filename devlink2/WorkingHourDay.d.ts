import * as React from "react";
import * as Types from "./types";

declare function WorkingHourDay(props: {
  as?: React.ElementType;
  slotRcCheckbox?: Types.Devlink.Slot;
  slotTimeRageInput?: Types.Devlink.Slot;
  isApplytoAll?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
