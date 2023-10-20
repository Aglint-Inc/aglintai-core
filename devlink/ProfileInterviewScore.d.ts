import * as React from "react";
import * as Types from "./types";

declare function ProfileInterviewScore(props: {
  as?: React.ElementType;
  textInterviewScoreState?: React.ReactNode;
  propsTextColor?: Types.Devlink.RuntimeProps;
  textInterviewScore?: React.ReactNode;
  propsTextColorInterviewScore?: Types.Devlink.RuntimeProps;
  propsBgColorInterviewScore?: Types.Devlink.RuntimeProps;
  slotFeedbackScore?: Types.Devlink.Slot;
  slotDetailedFeedback?: Types.Devlink.Slot;
}): React.JSX.Element;
