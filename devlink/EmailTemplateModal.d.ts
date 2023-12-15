import * as React from "react";
import * as Types from "./types";

declare function EmailTemplateModal(props: {
  as?: React.ElementType;
  textTemplateName?: React.ReactNode;
  onClickEditName?: Types.Devlink.RuntimeProps;
  onClickEdit?: Types.Devlink.RuntimeProps;
  slotTemplateButton?: Types.Devlink.Slot;
  slotSubjectInput?: Types.Devlink.Slot;
  slotBodyInput?: Types.Devlink.Slot;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickSaveTemplate?: Types.Devlink.RuntimeProps;
  slotButtonIcon?: Types.Devlink.Slot;
  isButtonDisable?: Types.Visibility.VisibilityConditions;
  isButtonIconVisible?: Types.Visibility.VisibilityConditions;
  isEditIconVisible?: Types.Visibility.VisibilityConditions;
  isSaveButtonVisible?: Types.Visibility.VisibilityConditions;
  onClickSave?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
