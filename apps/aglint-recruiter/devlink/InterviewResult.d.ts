import * as React from "react";
import * as Types from "./types";

declare function InterviewResult(props: {
  as?: React.ElementType;
  slotScore?: Types.Devlink.Slot;
  textScore?: React.ReactNode;
  onClickShowTranscript?: Types.Devlink.RuntimeProps;
  slotInterviewFeedback?: Types.Devlink.Slot;
}): React.JSX.Element;
