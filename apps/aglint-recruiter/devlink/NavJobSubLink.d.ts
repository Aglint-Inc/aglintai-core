import * as React from "react";
import * as Types from "./types";

declare function NavJobSubLink(props: {
  as?: React.ElementType;
  isJobAll?: Types.Visibility.VisibilityConditions;
  isJobActive?: Types.Visibility.VisibilityConditions;
  isJobInactive?: Types.Visibility.VisibilityConditions;
  isJobClosed?: Types.Visibility.VisibilityConditions;
  allCount?: React.ReactNode;
  activeCount?: React.ReactNode;
  inActiveCount?: React.ReactNode;
  closedCount?: React.ReactNode;
  onClickJobAll?: Types.Devlink.RuntimeProps;
  onClickJobActive?: Types.Devlink.RuntimeProps;
  onClickJobInactive?: Types.Devlink.RuntimeProps;
  onClickJobClosed?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
