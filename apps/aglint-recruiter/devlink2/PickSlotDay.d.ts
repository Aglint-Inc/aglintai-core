import * as React from "react";
import * as Types from "./types";

declare function PickSlotDay(props: {
  as?: React.ElementType;
  isPickedCalendarActive?: Types.Visibility.VisibilityConditions;
  textPickDays?: React.ReactNode;
  slotCalenderPick?: Types.Devlink.Slot;
  isPickSlotIconActive?: Types.Visibility.VisibilityConditions;
  textPickSlots?: React.ReactNode;
  isPickTimeDescVisible?: Types.Visibility.VisibilityConditions;
  slotTimePick?: Types.Devlink.Slot;
  slotSlotPicker?: Types.Devlink.Slot;
  slotPrimaryButton?: Types.Devlink.Slot;
}): React.JSX.Element;
