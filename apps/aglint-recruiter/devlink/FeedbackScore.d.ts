import * as React from "react";
import * as Types from "./types";

declare function FeedbackScore(props: {
  as?: React.ElementType;
  textFeedback?: React.ReactNode;
  slotFeedbackScoreGraphs?: Types.Devlink.Slot;
  textScorePercentage?: React.ReactNode;
  propsTextScore?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
