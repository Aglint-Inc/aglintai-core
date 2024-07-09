import * as React from "react";
import * as Types from "./types";

declare function EmailTemplatesStart(props: {
  as?: React.ElementType;
  onClickApplicationRecieved?: Types.Devlink.RuntimeProps;
  onClickInterviewInvite?: Types.Devlink.RuntimeProps;
  onClickFollowInterview?: Types.Devlink.RuntimeProps;
  onClickDisqualified?: Types.Devlink.RuntimeProps;
  slotEmailTemplateCards?: Types.Devlink.Slot;
  isProceedDisable?: Types.Visibility.VisibilityConditions;
  onClickProceed?: Types.Devlink.RuntimeProps;
  isAddJob?: Types.Visibility.VisibilityConditions;
  onClickDone?: Types.Devlink.RuntimeProps;
  onClickSaveDraft?: Types.Devlink.RuntimeProps;
  slotButtonPrimaryRegular?: Types.Devlink.Slot;
  slotBasicButton?: Types.Devlink.Slot;
  slotWarning?: Types.Devlink.Slot;
  isWarningVisible?: Types.Visibility.VisibilityConditions;
  slotEmailDetails?: Types.Devlink.Slot;
  slotNewTabPill?: Types.Devlink.Slot;
  slotSearchFilter?: Types.Devlink.Slot;
  showTabs?: Types.Visibility.VisibilityConditions;
  currentModule?: Types.Builtin.Text;
}): React.JSX.Element;
