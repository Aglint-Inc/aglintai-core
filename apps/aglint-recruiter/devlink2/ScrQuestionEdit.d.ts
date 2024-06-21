import * as React from "react";
import * as Types from "./types";

declare function ScrQuestionEdit(props: {
  as?: React.ElementType;
  onclickRequiredCheckbox?: Types.Devlink.RuntimeProps;
  isReqChecked?: Types.Visibility.VisibilityConditions;
  slotQuestionInput?: Types.Devlink.Slot;
  isOptionsVisible?: Types.Visibility.VisibilityConditions;
  slotOptions?: Types.Devlink.Slot;
  onclickAddOption?: Types.Devlink.RuntimeProps;
  onclickDelete?: Types.Devlink.RuntimeProps;
  isDeleteVisible?: Types.Visibility.VisibilityConditions;
  slotDescription?: Types.Devlink.Slot;
  isDescriptionVisible?: Types.Visibility.VisibilityConditions;
  slotDescriptionToggle?: Types.Devlink.Slot;
  onclickClose?: Types.Devlink.RuntimeProps;
  slotDropdown?: Types.Devlink.Slot;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
