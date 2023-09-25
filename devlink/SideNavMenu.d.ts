import * as React from "react";
import * as Types from "./types";

declare function SideNavMenu(props: {
  as?: React.ElementType;
  isMyJobs?: Types.Visibility.VisibilityConditions;
  isMyCompany?: Types.Visibility.VisibilityConditions;
  isMyCandidateDatabase?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
