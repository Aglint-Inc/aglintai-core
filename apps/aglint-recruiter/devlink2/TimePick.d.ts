import * as React from "react";
import * as Types from "./types";

declare function TimePick(props: {
  as?: React.ElementType;
  slotSlotPicker?: Types.Devlink.Slot;
  onClickPrev?: Types.Devlink.RuntimeProps;
  onClickNext?: Types.Devlink.RuntimeProps;
  styleScrollProps?: Types.Devlink.RuntimeProps;
  isArrowVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
