import * as React from "react";
import * as Types from "./types";

declare function CdEmailOutreach(props: {
  as?: React.ElementType;
  onClickBack?: Types.Devlink.RuntimeProps;
  slotTemplateButton?: Types.Devlink.Slot;
  onClickEdit?: Types.Devlink.RuntimeProps;
  slotInputMailId?: Types.Devlink.Slot;
  onClickCopyMail?: Types.Devlink.RuntimeProps;
  slotInputSubject?: Types.Devlink.Slot;
  slotInputBody?: Types.Devlink.Slot;
  slotButtonGenerate?: Types.Devlink.Slot;
  onClickSendMail?: Types.Devlink.RuntimeProps;
  slotLinkMail?: Types.Devlink.Slot;
  slotEmailSent?: Types.Devlink.Slot;
  isEmailBodyVisible?: Types.Visibility.VisibilityConditions;
  slotLottie?: Types.Devlink.Slot;
  isLoading?: Types.Visibility.VisibilityConditions;
  slotLoadingIcon?: Types.Devlink.Slot;
  isEmailInputVisible?: Types.Visibility.VisibilityConditions;
  isEmailSuccess?: Types.Visibility.VisibilityConditions;
  onClickAddFollowUp?: Types.Devlink.RuntimeProps;
  onClickOpenInbox?: Types.Devlink.RuntimeProps;
  slotEmailSuccessCard?: Types.Devlink.Slot;
  isRegenerateVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
