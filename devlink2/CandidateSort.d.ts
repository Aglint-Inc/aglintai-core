import * as React from "react";
import * as Types from "./types";

declare function CandidateSort(props: {
  as?: React.ElementType;
  isSortBodyVisible?: Types.Visibility.VisibilityConditions;
  slotBody?: Types.Devlink.Slot;
  onclickSort?: Types.Devlink.RuntimeProps;
  isSortVisible?: Types.Visibility.VisibilityConditions;
  sortLabelText?: React.ReactNode;
}): React.JSX.Element;
