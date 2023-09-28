import * as React from "react";
import * as Types from "./types";

declare function InterviewTranscriptCard(props: {
  as?: React.ElementType;
  slotAiImage?: Types.Devlink.Slot;
  textAiName?: React.ReactNode;
  slotPlayButton?: Types.Devlink.Slot;
  textQuestion?: React.ReactNode;
  textAnswer?: React.ReactNode;
  slotUserPlayButton?: Types.Devlink.Slot;
  slotUserImage?: Types.Devlink.Slot;
  userTextName?: React.ReactNode;
}): React.JSX.Element;
