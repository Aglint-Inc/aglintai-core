import * as React from "react";
import * as Types from "./types";

declare function AllApplicantsTable(props: {
  as?: React.ElementType;
  onclickSelectAll?: Types.Devlink.RuntimeProps;
  isAllChecked?: Types.Visibility.VisibilityConditions;
  isInterviewVisible?: Types.Visibility.VisibilityConditions;
  slotCandidatesList?: Types.Devlink.Slot;
  topMatchCount?: React.ReactNode;
  goodMatchCount?: React.ReactNode;
  averageMatchCount?: React.ReactNode;
  belowMatchCount?: React.ReactNode;
  noMatchCount?: React.ReactNode;
  notFoundCount?: React.ReactNode;
  isScreeningVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
