import * as React from "react";
import * as Types from "./types";

declare function InterviewerMetricList(props: {
  as?: React.ElementType;
  slotImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  textCount?: React.ReactNode;
  countHours?: React.ReactNode;
  countInterviews?: React.ReactNode;
  countDeclines?: React.ReactNode;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
