import * as React from "react";
import * as Types from "./types";

declare function CandidateSortBody(props: {
  as?: React.ElementType;
  slotInput?: Types.Devlink.Slot;
  onclickAscending?: Types.Devlink.RuntimeProps;
  isAscending?: Types.Visibility.VisibilityConditions;
  onclickDescending?: Types.Devlink.RuntimeProps;
  isDescending?: Types.Visibility.VisibilityConditions;
  slotButton?: Types.Devlink.Slot;
}): React.JSX.Element;
