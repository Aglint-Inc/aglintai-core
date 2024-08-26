import * as React from "react";
import * as Types from "./types";

declare function InterviewerAvailability(props: {
  as?: React.ElementType;
  slotFilter?: Types.Devlink.Slot;
  textDateRange?: React.ReactNode;
  onClickLeftIcon?: Types.Devlink.RuntimeProps;
  onClickRightIcon?: Types.Devlink.RuntimeProps;
  textDay1?: React.ReactNode;
  textDay2?: React.ReactNode;
  textDay3?: React.ReactNode;
  textDay4?: React.ReactNode;
  textDay5?: React.ReactNode;
  slotInterviewerList?: Types.Devlink.Slot;
}): React.JSX.Element;
