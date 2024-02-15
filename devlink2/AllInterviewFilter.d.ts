import * as React from "react";
import * as Types from "./types";

declare function AllInterviewFilter(props: {
  as?: React.ElementType;
  isRelatedJobVisible?: Types.Visibility.VisibilityConditions;
  isScheduleTypeVisible?: Types.Visibility.VisibilityConditions;
  isStatusVisible?: Types.Visibility.VisibilityConditions;
  isInterviewPanelVisible?: Types.Visibility.VisibilityConditions;
  isDataRangeVisible?: Types.Visibility.VisibilityConditions;
  isDurationVisible?: Types.Visibility.VisibilityConditions;
  onClickRelatedJob?: Types.Devlink.RuntimeProps;
  onClickScheduleType?: Types.Devlink.RuntimeProps;
  onClickStatus?: Types.Devlink.RuntimeProps;
  onClickInterviewPanel?: Types.Devlink.RuntimeProps;
  onClickDateRange?: Types.Devlink.RuntimeProps;
  onClickDuration?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
