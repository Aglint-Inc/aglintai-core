import * as React from "react";
import * as Types from "./types";

declare function SchedulingPop(props: {
  as?: React.ElementType;
  slotRadioEmail?: Types.Devlink.Slot;
  slotRadiophone?: Types.Devlink.Slot;
  isEmailActive?: Types.Visibility.VisibilityConditions;
  isPhoneActive?: Types.Visibility.VisibilityConditions;
  slotPrimaryButton?: Types.Devlink.Slot;
  slotInput1?: Types.Devlink.Slot;
  slotInput2?: Types.Devlink.Slot;
  onClickClose?: Types.Devlink.RuntimeProps;
  textEmail?: React.ReactNode;
  textPhone?: React.ReactNode;
  slotInput3?: Types.Devlink.Slot;
}): React.JSX.Element;
