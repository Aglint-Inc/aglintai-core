import * as React from "react";
import * as Types from "./types";

declare function ReqAvailability(props: {
  as?: React.ElementType;
  textDateAvailability?: React.ReactNode;
  onClickEditDate?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
  textScheduleSelected?: React.ReactNode;
  textDuration?: React.ReactNode;
  slotScheduleSelectPill?: Types.Devlink.Slot;
  slotReqToggle?: Types.Devlink.Slot;
  slotCheckboxAvailability?: Types.Devlink.Slot;
  isFoundSlots?: Types.Visibility.VisibilityConditions;
  slotAvailabilityCriteria?: Types.Devlink.Slot;
  isCheckingSlotsVisible?: Types.Visibility.VisibilityConditions;
  isCheckbox?: Types.Visibility.VisibilityConditions;
  textFoundSlotsCount?: React.ReactNode;
  slotBadge?: Types.Devlink.Slot;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
