import * as React from "react";
import * as Types from "./types";

declare function InterviewerWorkload(props: {
  as?: React.ElementType;
  slotFilter?: Types.Devlink.Slot;
  textDateRange?: React.ReactNode;
  onClickLeft?: Types.Devlink.RuntimeProps;
  onClickRight?: Types.Devlink.RuntimeProps;
  slotInterviewWorkloadList?: Types.Devlink.Slot;
}): React.JSX.Element;
