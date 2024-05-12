import * as React from "react";
import * as Types from "./types";

declare function InterviewerPage(props: {
  as?: React.ElementType;
  textInterviewDetail?: React.ReactNode;
  slotDarkPill?: Types.Devlink.Slot;
  slotInterviewerDetail?: Types.Devlink.Slot;
}): React.JSX.Element;
