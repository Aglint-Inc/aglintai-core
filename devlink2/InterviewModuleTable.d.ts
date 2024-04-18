import * as React from "react";
import * as Types from "./types";

declare function InterviewModuleTable(props: {
  as?: React.ElementType;
  slotInterviewModuleCard?: Types.Devlink.Slot;
  slotFilter?: Types.Devlink.Slot;
  isFilterVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
