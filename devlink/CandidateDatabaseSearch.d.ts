import * as React from "react";
import * as Types from "./types";

declare function CandidateDatabaseSearch(props: {
  as?: React.ElementType;
  onClickAllCandidate?: Types.Devlink.RuntimeProps;
  onClickDbRequest?: Types.Devlink.RuntimeProps;
  onClickSearchJobDescription?: Types.Devlink.RuntimeProps;
  slotInputSearch?: Types.Devlink.Slot;
  isClearHistoryVisible?: Types.Visibility.VisibilityConditions;
  onClickClearHistory?: Types.Devlink.RuntimeProps;
  slotCandidateHistoryCard?: Types.Devlink.Slot;
  onClickSearch?: Types.Devlink.RuntimeProps;
  slotLottieSearch?: Types.Devlink.Slot;
  textCandidateCount?: React.ReactNode;
  isSearchInAglintVisible?: Types.Visibility.VisibilityConditions;
  isSearchInAllVisible?: Types.Visibility.VisibilityConditions;
  slotNavSublink?: Types.Devlink.Slot;
  isSearchJdVisible?: Types.Visibility.VisibilityConditions;
  isSearchByJdVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
