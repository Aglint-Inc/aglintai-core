import * as React from "react";
import * as Types from "./types";

declare function SideNavMenu(props: {
  as?: React.ElementType;
  isMyJobs?: Types.Visibility.VisibilityConditions;
  isMyCandidateDatabase?: Types.Visibility.VisibilityConditions;
  onClickJob?: Types.Devlink.RuntimeProps;
  slotJobSubLink?: Types.Devlink.Slot;
}): React.JSX.Element;
