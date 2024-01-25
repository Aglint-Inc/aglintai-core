import * as React from "react";
import * as Types from "./types";

declare function CandidateInterviewScore(props: {
  as?: React.ElementType;
  onClickDetailedFeedback?: Types.Devlink.RuntimeProps;
  slotInterviewFeedbackScore?: Types.Devlink.Slot;
  slotAssessmentScore?: Types.Devlink.Slot;
  propsCollapse?: Types.Devlink.RuntimeProps;
  onClickCard?: Types.Devlink.RuntimeProps;
  onClickIcons?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
