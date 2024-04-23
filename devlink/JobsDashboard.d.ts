import * as React from "react";
import * as Types from "./types";

declare function JobsDashboard(props: {
  as?: React.ElementType;
  slotAllJobs?: Types.Devlink.Slot;
  slotSearchInputJob?: Types.Devlink.Slot;
  textJobsHeader?: React.ReactNode;
  onClickAddJob?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
