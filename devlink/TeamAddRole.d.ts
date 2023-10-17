import * as React from "react";
import * as Types from "./types";

declare function TeamAddRole(props: {
  as?: React.ElementType;
  slotNameInput?: Types.Devlink.Slot;
  slotPermissions?: Types.Devlink.Slot;
  slotButton?: Types.Devlink.Slot;
  onClickClose?: Types.Devlink.RuntimeProps;
  textEditAddUser?: React.ReactNode;
  isTextDescVisible?: Types.Visibility.VisibilityConditions;
  onClickDelete?: Types.Devlink.RuntimeProps;
  onClickSaveChanges?: Types.Devlink.RuntimeProps;
  isDeleteButtonVisible?: Types.Visibility.VisibilityConditions;
  textButtonSaveChanges?: React.ReactNode;
}): React.JSX.Element;
