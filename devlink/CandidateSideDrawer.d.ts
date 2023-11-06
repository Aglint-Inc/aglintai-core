import * as React from "react";
import * as Types from "./types";

declare function CandidateSideDrawer(props: {
  as?: React.ElementType;
  onClickPrev?: Types.Devlink.RuntimeProps;
  onClickNext?: Types.Devlink.RuntimeProps;
  onClickCopyProfile?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotCandidateImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textMail?: React.ReactNode;
  textPhone?: React.ReactNode;
  textOverviewDesc?: React.ReactNode;
  slotCandidateDetails?: Types.Devlink.Slot;
  isOverviewVisible?: Types.Visibility.VisibilityConditions;
  isLinkedInVisible?: Types.Visibility.VisibilityConditions;
  isCopiedMessageVisible?: Types.Visibility.VisibilityConditions;
  linkedinLink?: Types.Basic.Link;
}): React.JSX.Element;
