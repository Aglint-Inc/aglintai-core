import * as React from "react";
import * as Types from "./types";

declare function CandidatesListPagination(props: {
  as?: React.ElementType;
  onclickPrevious?: Types.Devlink.RuntimeProps;
  onclickNext?: Types.Devlink.RuntimeProps;
  totalPageCount?: React.ReactNode;
  currentCandidatesCount?: React.ReactNode;
  totalCandidatesCount?: React.ReactNode;
  slotPageNumber?: Types.Devlink.Slot;
}): React.JSX.Element;
