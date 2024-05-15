import * as React from "react";
import * as Types from "./types";

declare function InterviewModuleStats(props: {
  as?: React.ElementType;
  slotInterviewModuleStatsCard?: Types.Devlink.Slot;
  onClickViewAllModules?: Types.Devlink.RuntimeProps;
  isViewAllVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
