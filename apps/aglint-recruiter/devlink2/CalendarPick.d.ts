import * as React from "react";
import * as Types from "./types";

declare function CalendarPick(props: {
  as?: React.ElementType;
  onClickPrev?: Types.Devlink.RuntimeProps;
  onClickNext?: Types.Devlink.RuntimeProps;
  slotDatePicker?: Types.Devlink.Slot;
  styleScrollProps?: Types.Devlink.RuntimeProps;
  isArrowVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
