import * as React from "react";
import * as Types from "./types";

declare function InterviewTranscriptCard(props: {
  as?: React.ElementType;
  slotAiTranscript?: Types.Devlink.Slot;
  slotUserTranscript?: Types.Devlink.Slot;
}): React.JSX.Element;
