import * as React from "react";
import * as Types from "./types";

declare function TopCandidateListItem(props: {
  as?: React.ElementType;
  onclickSelect?: Types.Devlink.RuntimeProps;
  isChecked?: Types.Visibility.VisibilityConditions;
  slotScores?: Types.Devlink.Slot;
  name?: React.ReactNode;
  overview?: React.ReactNode;
  onclickCandidate?: Types.Devlink.RuntimeProps;
  isHighlighted?: Types.Visibility.VisibilityConditions;
  slotInsights?: Types.Devlink.Slot;
  slotProfileImage?: Types.Devlink.Slot;
  slotAnalysis?: Types.Devlink.Slot;
}): React.JSX.Element;
