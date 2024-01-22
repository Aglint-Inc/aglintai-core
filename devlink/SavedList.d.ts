import * as React from "react";
import * as Types from "./types";

declare function SavedList(props: {
  as?: React.ElementType;
  textRole?: React.ReactNode;
  textCountCandidate?: React.ReactNode;
  onClickList?: Types.Devlink.RuntimeProps;
  slotCheckbox?: Types.Devlink.Slot;
  onClickEdit?: Types.Devlink.RuntimeProps;
  onClickDelete?: Types.Devlink.RuntimeProps;
  isEditVisible?: Types.Visibility.VisibilityConditions;
  slotInputTextSavedList?: Types.Devlink.Slot;
  isSavedListInputVisible?: Types.Visibility.VisibilityConditions;
  isSavedListTextVisible?: Types.Visibility.VisibilityConditions;
  onClickSubmit?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
  isCheckboxVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
