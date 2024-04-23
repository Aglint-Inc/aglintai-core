import * as React from "react";
import * as Types from "./types";

declare function SchedulerDashboard(props: {
  as?: React.ElementType;
  onClickAllInterviews?: Types.Devlink.RuntimeProps;
  onClickInterviewPanel?: Types.Devlink.RuntimeProps;
  onClickMySchedule?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
