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
  isOverviewVisible?: Types.Visibility.VisibilityConditions;
  isLocationRoleVisible?: Types.Visibility.VisibilityConditions;
  slotSocialLink?: Types.Devlink.Slot;
  isNavigationButtonVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
