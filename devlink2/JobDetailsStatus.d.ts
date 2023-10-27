import * as React from "react";
import * as Types from "./types";

declare function JobDetailsStatus(props: {
  as?: React.ElementType;
  isSourcingScheduled?: Types.Visibility.VisibilityConditions;
  isSourcingActive?: Types.Visibility.VisibilityConditions;
  sourcingInfoText?: React.ReactNode;
  isInterviewingScheduled?: Types.Visibility.VisibilityConditions;
  isInterviewingActive?: Types.Visibility.VisibilityConditions;
  interviewStatusText?: React.ReactNode;
}): React.JSX.Element;
