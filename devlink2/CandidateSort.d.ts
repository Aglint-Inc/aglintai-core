import * as React from "react";
import * as Types from "./types";

declare function CandidateSort(props: {
  as?: React.ElementType;
  isSortCountVisible?: Types.Visibility.VisibilityConditions;
  sortCount?: React.ReactNode;
  isResetVisible?: Types.Visibility.VisibilityConditions;
  isDescending?: Types.Visibility.VisibilityConditions;
  isAscending?: Types.Visibility.VisibilityConditions;
  onclickDescending?: Types.Devlink.RuntimeProps;
  onclickAscending?: Types.Devlink.RuntimeProps;
  onclickApply?: Types.Devlink.RuntimeProps;
  slotInput?: Types.Devlink.Slot;
  isSortBodyVisible?: Types.Visibility.VisibilityConditions;
  sortBodyProps?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
