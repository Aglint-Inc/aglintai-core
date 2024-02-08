import * as React from "react";
import * as Types from "./types";

declare function InterviewPanelSidebar(props: {
  as?: React.ElementType;
  textTitle?: React.ReactNode;
  textPanelMemberTitle?: React.ReactNode;
  textPanelMemberDescription?: React.ReactNode;
  slotPanelMemberPills?: Types.Devlink.Slot;
  slotPanelMemberDropdown?: Types.Devlink.Slot;
  slotPanelNameInput?: Types.Devlink.Slot;
  isButtonEnabled?: Types.Visibility.VisibilityConditions;
  onClickButton?: Types.Devlink.RuntimeProps;
  textButton?: React.ReactNode;
  isMemberEmpty?: Types.Visibility.VisibilityConditions;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotLoader?: Types.Devlink.Slot;
  isLoading?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
