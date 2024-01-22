import * as React from "react";
import * as Types from "./types";

declare function SavedListMenu(props: {
  as?: React.ElementType;
  slotSavedList?: Types.Devlink.Slot;
  isInputVisible?: Types.Visibility.VisibilityConditions;
  isCreateListVisible?: Types.Visibility.VisibilityConditions;
  onClickSubmit?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotInput?: Types.Devlink.Slot;
  onClickCreateList?: Types.Devlink.RuntimeProps;
  slotAddButton?: Types.Devlink.Slot;
  isBottomWrapVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
