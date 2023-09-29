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
  isInterviewVisible?: Types.Visibility.VisibilityConditions;
  slotResumeScore?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  isResumeVisible?: Types.Visibility.VisibilityConditions;
  slotInterviewResult?: Types.Devlink.Slot;
  onClickCopyProfile?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
  isCloseButtonVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
