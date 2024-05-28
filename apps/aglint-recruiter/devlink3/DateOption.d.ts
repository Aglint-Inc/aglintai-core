import * as React from "react";
import * as Types from "./types";

declare function DateOption(props: {
  as?: React.ElementType;
  slotScheduleOption?: Types.Devlink.Slot;
  isSelected?: Types.Visibility.VisibilityConditions;
  textdate?: React.ReactNode;
  textOptionCount?: React.ReactNode;
  onClickDateOption?: Types.Devlink.RuntimeProps;
  rotateArrow?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
