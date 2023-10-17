import * as React from "react";
import * as Types from "./types";

declare function CandidateResumeScore(props: {
  as?: React.ElementType;
  slotScoreGraph?: Types.Devlink.Slot;
  textScoreState?: React.ReactNode;
  propsTextColor?: Types.Devlink.RuntimeProps;
  onClickDownloadResume?: Types.Devlink.RuntimeProps;
  onClickViewResume?: Types.Devlink.RuntimeProps;
  slotFeedbackScore?: Types.Devlink.Slot;
}): React.JSX.Element;
