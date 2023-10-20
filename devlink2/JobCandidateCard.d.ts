import * as React from "react";
import * as Types from "./types";

declare function JobCandidateCard(props: {
  as?: React.ElementType;
  isChecked?: Types.Visibility.VisibilityConditions;
  textOrder?: React.ReactNode;
  slotProfilePic?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  textMail?: React.ReactNode;
  textPhone?: React.ReactNode;
  slotScore?: Types.Devlink.Slot;
  scoreTextColor?: Types.Devlink.RuntimeProps;
  textScore?: React.ReactNode;
  statusBgColor?: Types.Devlink.RuntimeProps;
  statusTextColor?: Types.Devlink.RuntimeProps;
  textStatus?: React.ReactNode;
  textAppliedOn?: React.ReactNode;
  onClickCard?: Types.Devlink.RuntimeProps;
  onClickCheckbox?: Types.Devlink.RuntimeProps;
  isInterview?: Types.Visibility.VisibilityConditions;
  isSelected?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
