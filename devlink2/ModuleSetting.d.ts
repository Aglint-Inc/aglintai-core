import * as React from "react";
import * as Types from "./types";

declare function ModuleSetting(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotModuleNameInput?: Types.Devlink.Slot;
  slotRequiresTrainingToggle?: Types.Devlink.Slot;
  slotInputNoOfShadow?: Types.Devlink.Slot;
  slotInputNoOfReverse?: Types.Devlink.Slot;
  slotCheckbox?: Types.Devlink.Slot;
  isApprovalDoneVisible?: Types.Visibility.VisibilityConditions;
  slotApprovalDoneInput?: Types.Devlink.Slot;
  isRequireTrainingVisible?: Types.Visibility.VisibilityConditions;
  slotButtonPrimary?: Types.Devlink.Slot;
}): React.JSX.Element;
