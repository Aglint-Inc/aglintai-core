import * as React from "react";
import * as Types from "./types";

declare function RequestReschedule(props: {
  as?: React.ElementType;
  slotDateRangeInput?: Types.Devlink.Slot;
  slotRadioText?: Types.Devlink.Slot;
  slotInputAdditionalNotes?: Types.Devlink.Slot;
  slotButton?: Types.Devlink.Slot;
  onClickClose?: Types.Devlink.RuntimeProps;
  textHeader?: React.ReactNode;
  isRangeVisible?: Types.Visibility.VisibilityConditions;
  onClickTryReschedulingNow?: Types.Devlink.RuntimeProps;
  isCancelWarningVisible?: Types.Visibility.VisibilityConditions;
  slotCancelButton?: Types.Devlink.Slot;
  slotPrimaryButton?: Types.Devlink.Slot;
}): React.JSX.Element;
