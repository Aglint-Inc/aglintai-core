import * as React from "react";
import * as Types from "./types";

declare function CandidateDatabaseDetail(props: {
  as?: React.ElementType;
  onClickViewJobDescription?: Types.Devlink.RuntimeProps;
  onClickDownload?: Types.Devlink.RuntimeProps;
  onClickImport?: Types.Devlink.RuntimeProps;
  slotSearchInput?: Types.Devlink.Slot;
  onClickAll?: Types.Devlink.RuntimeProps;
  isAllActive?: Types.Visibility.VisibilityConditions;
  onClickBookmarked?: Types.Visibility.VisibilityConditions;
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
  isViewJdVisible?: Types.Visibility.VisibilityConditions;
  onClickFilter?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
