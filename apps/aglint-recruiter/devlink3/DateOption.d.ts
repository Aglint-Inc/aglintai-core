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
  isDisabled?: Types.Visibility.VisibilityConditions;
  slotCheckbox?: Types.Devlink.Slot;
  isCheckboxVisible?: Types.Visibility.VisibilityConditions;
  slotRightBlock?: Types.Devlink.Slot;
  slotLeftBlock?: Types.Devlink.Slot;
}): React.JSX.Element;
