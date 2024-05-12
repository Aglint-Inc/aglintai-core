import * as React from "react";
import * as Types from "./types";

declare function InterviewerDetail(props: {
  as?: React.ElementType;
  textInterviewerName?: React.ReactNode;
  textDepartment?: React.ReactNode;
  textTimeZone?: React.ReactNode;
  textInterviewPerDay?: React.ReactNode;
  textInterviewPerWeek?: React.ReactNode;
  slotInterviewerAvatar?: Types.Devlink.Slot;
  slotTabContent?: Types.Devlink.Slot;
  slotNewTabPill?: Types.Devlink.Slot;
  textMail?: React.ReactNode;
  textLocation?: React.ReactNode;
  textRole?: React.ReactNode;
}): React.JSX.Element;
