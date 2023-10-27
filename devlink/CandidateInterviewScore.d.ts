import * as React from "react";
import * as Types from "./types";

declare function CandidateInterviewScore(props: {
  as?: React.ElementType;
  textScore?: React.ReactNode;
  propsTextColor?: Types.Devlink.RuntimeProps;
  textInterviewScoreState?: React.ReactNode;
  onClickDetailedFeedback?: Types.Devlink.RuntimeProps;
  propsBgColorScore?: Types.Devlink.RuntimeProps;
  slotInterviewFeedbackScore?: Types.Devlink.Slot;
}): React.JSX.Element;
