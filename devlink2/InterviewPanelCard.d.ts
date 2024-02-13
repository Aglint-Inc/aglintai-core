import * as React from "react";
import * as Types from "./types";

declare function InterviewPanelCard(props: {
  as?: React.ElementType;
  textPanelName?: React.ReactNode;
  slotInterviewPanelMember?: Types.Devlink.Slot;
}): React.JSX.Element;
