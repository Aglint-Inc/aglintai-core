import * as React from "react";
import * as Types from "./types";

declare function EditEmail(props: {
  as?: React.ElementType;
  textEmailName?: React.ReactNode;
  slotForm?: Types.Devlink.Slot;
  editEmailDescription?: React.ReactNode;
  slotBottom?: Types.Devlink.Slot;
  isSaveChangesButtonVisible?: Types.Visibility.VisibilityConditions;
  isRequestTestMailVisible?: Types.Visibility.VisibilityConditions;
  textTipsMessage?: React.ReactNode;
  onClickPreview?: Types.Devlink.RuntimeProps;
  isPreviewVisible?: Types.Visibility.VisibilityConditions;
  slotButton?: Types.Devlink.Slot;
  onClickCloseTip?: Types.Devlink.RuntimeProps;
  isTipVisible?: Types.Visibility.VisibilityConditions;
  slotSaveButton?: Types.Devlink.Slot;
}): React.JSX.Element;
