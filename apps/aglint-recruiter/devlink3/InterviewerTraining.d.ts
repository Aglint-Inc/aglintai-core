import * as React from "react";
import * as Types from "./types";

declare function InterviewerTraining(props: {
  as?: React.ElementType;
  slotFilter?: Types.Devlink.Slot;
  slotInterviewerTrainnigList?: Types.Devlink.Slot;
  textDateRange?: React.ReactNode;
  onClickLeft?: Types.Devlink.RuntimeProps;
  onClickRight?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
