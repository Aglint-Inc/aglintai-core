import * as React from "react";
import * as Types from "./types";

declare function InterviewerTrainingList(props: {
  as?: React.ElementType;
  slotImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  slotInterviewPool?: Types.Devlink.Slot;
  slotTrainingProgress?: Types.Devlink.Slot;
}): React.JSX.Element;
