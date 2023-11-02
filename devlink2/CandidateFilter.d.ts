import * as React from "react";
import * as Types from "./types";

declare function CandidateFilter(props: {
  as?: React.ElementType;
  filterCount?: React.ReactNode;
  onclickResumeClear?: Types.Devlink.RuntimeProps;
  isResumeClear?: Types.Visibility.VisibilityConditions;
  slotResumeSlider?: Types.Devlink.Slot;
  onclickInterviewClear?: Types.Devlink.RuntimeProps;
  isInterviewClear?: Types.Visibility.VisibilityConditions;
  slotInterviewSlider?: Types.Devlink.Slot;
}): React.JSX.Element;
