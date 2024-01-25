import * as React from "react";
import * as Types from "./types";

declare function CandidateSideDrawer(props: {
  as?: React.ElementType;
  onClickPrev?: Types.Devlink.RuntimeProps;
  onClickNext?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotCandidateImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  slotCandidateDetails?: Types.Devlink.Slot;
  isLinkedInVisible?: Types.Visibility.VisibilityConditions;
  onClickLinkedin?: Types.Devlink.RuntimeProps;
  onClickCopyMail?: Types.Devlink.RuntimeProps;
  onClickCopyPhone?: Types.Devlink.RuntimeProps;
  isPhoneIconVisible?: Types.Visibility.VisibilityConditions;
  isMailIconVisible?: Types.Visibility.VisibilityConditions;
  slotMoveTo?: Types.Devlink.Slot;
  textAppliedOn?: React.ReactNode;
  isAppliedOnVisible?: Types.Visibility.VisibilityConditions;
  slotOverview?: Types.Devlink.Slot;
  onClickResume?: Types.Devlink.RuntimeProps;
  textRole?: React.ReactNode;
  textLocation?: React.ReactNode;
  isLocationVisible?: Types.Visibility.VisibilityConditions;
  isRoleVisible?: Types.Visibility.VisibilityConditions;
  isResumeVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
