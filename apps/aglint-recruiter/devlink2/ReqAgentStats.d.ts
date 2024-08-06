import * as React from "react";
import * as Types from "./types";

declare function ReqAgentStats(props: {
  as?: React.ElementType;
  textCountCompleted?: React.ReactNode;
  textCountReschedule?: React.ReactNode;
  textCountSchedule?: React.ReactNode;
  textCountConfirmed?: React.ReactNode;
  textCountCancelled?: React.ReactNode;
}): React.JSX.Element;
