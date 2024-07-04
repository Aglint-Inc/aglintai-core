import * as React from "react";
import * as Types from "./types";

declare function ReqAvailability(props: {
  as?: React.ElementType;
  textDateAvailability?: React.ReactNode;
  onClickEditDate?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
  textScheduleSelected?: React.ReactNode;
  textDuration?: React.ReactNode;
  slotIcons?: Types.Devlink.Slot;
  slotCheckingIcon?: Types.Devlink.Slot;
  slotScheduleSelectPill?: Types.Devlink.Slot;
  slotReqToggle?: Types.Devlink.Slot;
  slotCheckboxAvailability?: Types.Devlink.Slot;
  isFoundSlots?: Types.Visibility.VisibilityConditions;
  textFoundSlots?: React.ReactNode;
  slotAvailabilityCriteria?: Types.Devlink.Slot;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickReqAvailability?: Types.Devlink.RuntimeProps;
  isCheckingSlotsVisible?: Types.Visibility.VisibilityConditions;
  isCheckbox?: Types.Visibility.VisibilityConditions;
  isLoading?: Types.Visibility.VisibilityConditions;
  textFoundSlotsCount?: React.ReactNode;
  slotBadge?: Types.Devlink.Slot;
  textSelectedDate?: React.ReactNode;
}): React.JSX.Element;
