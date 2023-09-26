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
  textScore?: React.ReactNode;
  textStatus?: React.ReactNode;
  statusTextColor?: Types.Devlink.RuntimeProps;
  scoreTextColor?: Types.Devlink.RuntimeProps;
  statusBgColor?: Types.Devlink.RuntimeProps;
  textAppliedOn?: React.ReactNode;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
