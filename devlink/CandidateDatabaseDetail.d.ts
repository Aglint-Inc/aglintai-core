import * as React from "react";
import * as Types from "./types";

declare function CandidateDatabaseDetail(props: {
  as?: React.ElementType;
  slotSearchInput?: Types.Devlink.Slot;
  onClickAll?: Types.Devlink.RuntimeProps;
  isAllActive?: Types.Visibility.VisibilityConditions;
  isBookMarkedActive?: Types.Visibility.VisibilityConditions;
  slotCandidateDetailsCard?: Types.Devlink.Slot;
  isSelected?: Types.Visibility.VisibilityConditions;
  textSelectedCount?: React.ReactNode;
  onClickClearSelection?: Types.Devlink.RuntimeProps;
  onClickBookmarkSelection?: Types.Devlink.RuntimeProps;
  slotAddtoJob?: Types.Devlink.Slot;
  slotCandidateDialog?: Types.Devlink.Slot;
  onClickCandidateDatabase?: Types.Devlink.RuntimeProps;
  onClickDownloadBookmarked?: Types.Devlink.RuntimeProps;
  onClickDowloadAllCandidate?: Types.Devlink.RuntimeProps;
  onClickFilter?: Types.Devlink.RuntimeProps;
  textRole?: React.ReactNode;
  onClickBookmarked?: Types.Devlink.RuntimeProps;
  textAllCount?: React.ReactNode;
  textBookmarkCount?: React.ReactNode;
}): React.JSX.Element;
