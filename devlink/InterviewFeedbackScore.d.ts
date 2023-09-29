import * as React from "react";
import * as Types from "./types";

declare function InterviewFeedbackScore(props: {
  as?: React.ElementType;
  textFeedback?: React.ReactNode;
  slotScore?: Types.Devlink.Slot;
  textScorePercentage?: React.ReactNode;
  textScoreColorProps?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
