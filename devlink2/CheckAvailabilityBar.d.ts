import * as React from "react";
import * as Types from "./types";

declare function CheckAvailabilityBar(props: {
  as?: React.ElementType;
  slotTimezoneInput?: Types.Devlink.Slot;
  slotDurationInput?: Types.Devlink.Slot;
  slotDateRangeInput?: Types.Devlink.Slot;
  onClickCheckAvailabilty?: Types.Devlink.RuntimeProps;
  isSelected?: Types.Visibility.VisibilityConditions;
  onClickClose?: Types.Devlink.RuntimeProps;
  textSlotNumber?: React.ReactNode;
  slotAvatarGroup?: Types.Devlink.Slot;
  slotAvailableSlots?: Types.Devlink.Slot;
}): React.JSX.Element;
