import * as React from "react";
import * as Types from "./types";

declare function JobsDashboard(props: {
  as?: React.ElementType;
  onClickCreateNewJob?: Types.Devlink.RuntimeProps;
  slotAllJobs?: Types.Devlink.Slot;
  slotSearchInputJob?: Types.Devlink.Slot;
  jobCount?: React.ReactNode;
  textJobsHeader?: React.ReactNode;
  isJobCountTagVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
