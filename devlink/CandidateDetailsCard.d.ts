import * as React from "react";
import * as Types from "./types";

declare function CandidateDetailsCard(props: {
  as?: React.ElementType;
  onClickCheck?: Types.Devlink.RuntimeProps;
  isChecked?: Types.Visibility.VisibilityConditions;
  slotAvatar?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textJobRoleAtCompany?: React.ReactNode;
  textLocation?: React.ReactNode;
  textOverview?: React.ReactNode;
  isOverviewVisible?: Types.Visibility.VisibilityConditions;
  slotSkill?: Types.Devlink.Slot;
  isStarActive?: Types.Visibility.VisibilityConditions;
  onClickStar?: Types.Devlink.RuntimeProps;
  onClickCard?: Types.Devlink.RuntimeProps;
  isBorderActive?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
