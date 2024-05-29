import * as React from "react";
import * as Types from "./types";

declare function AvailabilityReq(props: {
  as?: React.ElementType;
  isPickedCalendarActive?: Types.Visibility.VisibilityConditions;
  slotCalenderPick?: Types.Devlink.Slot;
  slotTimePick?: Types.Devlink.Slot;
  slotPrimaryButton?: Types.Devlink.Slot;
  isPickTimeDescVisible?: Types.Visibility.VisibilityConditions;
  isPickSlotIconActive?: Types.Visibility.VisibilityConditions;
  slotSlotPicker?: Types.Devlink.Slot;
  textPickDays?: React.ReactNode;
  textPickSlots?: React.ReactNode;
}): React.JSX.Element;
