import * as React from "react";
import * as Types from "./types";

declare function CandidateDialog(props: {
  as?: React.ElementType;
  slotAddtoJob?: Types.Devlink.Slot;
  onClickPrev?: Types.Devlink.RuntimeProps;
  onClickNext?: Types.Devlink.RuntimeProps;
  onClickCopy?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotAvatar?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textMail?: React.ReactNode;
  onClickLinkedin?: Types.Devlink.RuntimeProps;
  textOverview?: React.ReactNode;
  isOverviewVisible?: Types.Visibility.VisibilityConditions;
  textLocation?: React.ReactNode;
  textJobRoleAtCompany?: React.ReactNode;
  slotDetails?: Types.Devlink.Slot;
  isStarActive?: Types.Visibility.VisibilityConditions;
  onClickStar?: Types.Devlink.RuntimeProps;
  onClickViewResume?: Types.Devlink.RuntimeProps;
  slotAddJob?: Types.Devlink.Slot;
}): React.JSX.Element;
