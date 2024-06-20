import * as React from "react";
import * as Types from "./types";

declare function SearchAglintCd(props: {
  as?: React.ElementType;
  isSearchEmpty?: Types.Visibility.VisibilityConditions;
  isSearchDbVisible?: Types.Visibility.VisibilityConditions;
  isSearchInAglintVisible?: Types.Visibility.VisibilityConditions;
  isSearchInAllVisible?: Types.Visibility.VisibilityConditions;
  slotInputSearch?: Types.Devlink.Slot;
  isSearchByJdVisible?: Types.Visibility.VisibilityConditions;
  onClickSearchJobDescription?: Types.Devlink.RuntimeProps;
  isSearchJdVisible?: Types.Visibility.VisibilityConditions;
  isEmpty?: Types.Visibility.VisibilityConditions;
  slotEmptyLottie?: Types.Devlink.Slot;
  isSavedListVisible?: Types.Visibility.VisibilityConditions;
  slotSavedList?: Types.Devlink.Slot;
  isSavedListEmpty?: Types.Visibility.VisibilityConditions;
  isInputVisible?: Types.Visibility.VisibilityConditions;
  slotInput?: Types.Devlink.Slot;
  onClickSubmit?: Types.Devlink.RuntimeProps;
  onClickClose?: Types.Devlink.RuntimeProps;
  onClickCreateNewList?: Types.Devlink.RuntimeProps;
  slotCandidateHistoryCard?: Types.Devlink.Slot;
  slotSearchButton?: Types.Devlink.Slot;
}): React.JSX.Element;
