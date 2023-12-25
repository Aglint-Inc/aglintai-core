import * as React from "react";
import * as Types from "./types";

declare function CandidateFilter(props: {
  as?: React.ElementType;
  filterCount?: React.ReactNode;
  filterHeaderProps?: Types.Devlink.RuntimeProps;
  isFilterBodyVisible?: Types.Visibility.VisibilityConditions;
  isCountVisible?: Types.Visibility.VisibilityConditions;
  slotBody?: Types.Devlink.Slot;
}): React.JSX.Element;
