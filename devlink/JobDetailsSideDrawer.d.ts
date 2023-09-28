import * as React from "react";
import * as Types from "./types";

declare function JobDetailsSideDrawer(props: {
  as?: React.ElementType;
  slotProfileImage?: Types.Devlink.Slot;
  textMail?: React.ReactNode;
  textPhone?: React.ReactNode;
  textSites?: React.ReactNode;
  slotKeySkills?: Types.Devlink.Slot;
  isKeySkillsVisible?: Types.Visibility.VisibilityConditions;
  textInterviewHeader?: React.ReactNode;
  slotScore?: Types.Devlink.Slot;
  onClickDetailedFeedback?: Types.Devlink.RuntimeProps;
  onClickCopyFeedbackLink?: Types.Devlink.RuntimeProps;
  slotTotalScoreGraph?: Types.Devlink.Slot;
  isInterviewVisible?: Types.Visibility.VisibilityConditions;
  slotResumeScore?: Types.Devlink.Slot;
  onClickAddToShortlist?: Types.Devlink.RuntimeProps;
  onClickReject?: Types.Devlink.RuntimeProps;
  textName?: React.ReactNode;
  textStatus?: React.ReactNode;
  textStatusColorProps?: Types.Devlink.RuntimeProps;
  statusBgColorProps?: Types.Devlink.RuntimeProps;
  isResumeVisible?: Types.Visibility.VisibilityConditions;
  onClickClose?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
