import * as React from "react";
import * as Types from "./types";

declare function InterviewDetailedFeedback(props: {
  as?: React.ElementType;
  slotCandidateImage?: Types.Devlink.Slot;
  textMail?: React.ReactNode;
  textName?: React.ReactNode;
  slotDetailedFeedback?: Types.Devlink.Slot;
  slotTranscript?: Types.Devlink.Slot;
  onClickClose?: Types.Devlink.RuntimeProps;
  onClickNext?: Types.Devlink.RuntimeProps;
  onClickPrev?: Types.Devlink.RuntimeProps;
  onClickBack?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
