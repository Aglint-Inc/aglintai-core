import * as React from "react";
import * as Types from "./types";

declare function InterviewerDetail(props: {
  as?: React.ElementType;
  textInterviewerName?: React.ReactNode;
  textDepartment?: React.ReactNode;
  textTimeZone?: React.ReactNode;
  slotInterviewerAvatar?: Types.Devlink.Slot;
  slotTabContent?: Types.Devlink.Slot;
  slotNewTabPill?: Types.Devlink.Slot;
  textMail?: React.ReactNode;
  textLocation?: React.ReactNode;
  textRole?: React.ReactNode;
  slotEditButton?: Types.Devlink.Slot;
  onClickLinkedIn?: Types.Devlink.RuntimeProps;
  isLinkedInVisible?: Types.Visibility.VisibilityConditions;
  textPhone?: React.ReactNode;
}): React.JSX.Element;
