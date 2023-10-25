import * as React from "react";
import * as Types from "./types";

declare function CandidateListItem(props: {
  as?: React.ElementType;
  onclickSelect?: Types.Devlink.RuntimeProps;
  isChecked?: Types.Visibility.VisibilityConditions;
  slotProfileImage?: Types.Devlink.Slot;
  name?: React.ReactNode;
  jobTitle?: React.ReactNode;
  resumeScore?: React.ReactNode;
  email?: React.ReactNode;
  phone?: React.ReactNode;
  isInterviewVisible?: Types.Visibility.VisibilityConditions;
  interviewScore?: React.ReactNode;
}): React.JSX.Element;
