import * as React from "react";
import * as Types from "./types";

declare function AiTranscript(props: {
  as?: React.ElementType;
  slotAiImage?: Types.Devlink.Slot;
  textAiName?: React.ReactNode;
  slotPlayButton?: Types.Devlink.Slot;
  textQuestion?: React.ReactNode;
}): React.JSX.Element;
