import * as React from "react";
import * as Types from "./types";

declare function CandidatesListPagination(props: {
  as?: React.ElementType;
  onclickPrevious?: Types.Devlink.RuntimeProps;
  onclickNext?: Types.Devlink.RuntimeProps;
  currentPageCount?: React.ReactNode;
  totalPageCount?: React.ReactNode;
  currentCandidatesCount?: React.ReactNode;
  totalCandidatesCount?: React.ReactNode;
}): React.JSX.Element;
