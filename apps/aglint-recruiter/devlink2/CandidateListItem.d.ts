import * as React from "react";
import * as Types from "./types";

declare function CandidateListItem(props: {
  as?: React.ElementType;
  onClickSelect?: Types.Devlink.RuntimeProps;
  slotProfileImage?: Types.Devlink.Slot;
  name?: React.ReactNode;
  appliedDate?: React.ReactNode;
  location?: React.ReactNode;
  jobTitle?: React.ReactNode;
  slotDisqualified?: Types.Devlink.Slot;
  isDisqualifiedVisible?: Types.Visibility.VisibilityConditions;
  isInterviewVisible?: Types.Visibility.VisibilityConditions;
  slotAssessmentScore?: Types.Devlink.Slot;
  slotScreening?: Types.Devlink.Slot;
  isScreeningVisible?: Types.Visibility.VisibilityConditions;
  slotResumeScore?: Types.Devlink.Slot;
  isChecked?: Types.Visibility.VisibilityConditions;
  onClickCandidate?: Types.Devlink.RuntimeProps;
  isHighlighted?: Types.Visibility.VisibilityConditions;
  propsDrag?: Types.Devlink.RuntimeProps;
  isDragVisible?: Types.Visibility.VisibilityConditions;
  isNewBadgeVisible?: Types.Visibility.VisibilityConditions;
  isBookmarkedVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
