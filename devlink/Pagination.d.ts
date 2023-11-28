import * as React from "react";
import * as Types from "./types";

declare function Pagination(props: {
  as?: React.ElementType;
  onClickPrev?: Types.Devlink.RuntimeProps;
  onClickNext?: Types.Devlink.RuntimeProps;
  textCurrentPageCount?: React.ReactNode;
  textTotalPageCount?: React.ReactNode;
  textCurrentCandidateCount?: React.ReactNode;
  textTotalCandidateCount?: React.ReactNode;
}): React.JSX.Element;
