import * as React from "react";
import * as Types from "./types";

declare function AllApplicantsTable(props: {
  as?: React.ElementType;
  onclickSelectAll?: Types.Devlink.RuntimeProps;
  isAllChecked?: Types.Visibility.VisibilityConditions;
  isInterviewVisible?: Types.Visibility.VisibilityConditions;
  slotCandidatesList?: Types.Devlink.Slot;
}): React.JSX.Element;
