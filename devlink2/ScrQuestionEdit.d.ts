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
  slotButtons?: Types.Devlink.Slot;
  onclickDelete?: Types.Devlink.RuntimeProps;
  isDeleteVisible?: Types.Visibility.VisibilityConditions;
  slotDescription?: Types.Devlink.Slot;
  isDescriptionVisible?: Types.Visibility.VisibilityConditions;
  slotDescriptionToggle?: Types.Devlink.Slot;
  topHeading?: React.ReactNode;
}): React.JSX.Element;
