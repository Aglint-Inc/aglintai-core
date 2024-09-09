import * as React from "react";
import * as Types from "./types";

declare function SchedulingQuickLink(props: {
  as?: React.ElementType;
  onClickCandidates?: Types.Devlink.RuntimeProps;
  onClickSchedules?: Types.Devlink.RuntimeProps;
  onClickInterviewTypes?: Types.Devlink.RuntimeProps;
  onClickInterviewers?: Types.Devlink.RuntimeProps;
  onClickSettings?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
