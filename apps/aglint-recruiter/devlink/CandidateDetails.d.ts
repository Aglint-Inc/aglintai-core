import * as React from "react";
import * as Types from "./types";

declare function CandidateDetails(props: {
  as?: React.ElementType;
  onClickScore?: Types.Devlink.RuntimeProps;
  onClickEducation?: Types.Devlink.RuntimeProps;
  onClickExperience?: Types.Devlink.RuntimeProps;
  onClickSkills?: Types.Devlink.RuntimeProps;
  slotInterviewScore?: Types.Devlink.Slot;
  slotResumeScore?: Types.Devlink.Slot;
  slotEducation?: Types.Devlink.Slot;
  slotExperiences?: Types.Devlink.Slot;
  slotSkills?: Types.Devlink.Slot;
  isFullWidthVisible?: Types.Visibility.VisibilityConditions;
  isSmallWidthVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
