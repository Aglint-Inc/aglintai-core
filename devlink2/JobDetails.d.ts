import * as React from "react";
import * as Types from "./types";

declare function JobDetails(props: {
  as?: React.ElementType;
  textJobStatus?: React.ReactNode;
  textRole?: React.ReactNode;
  textApplicantsNumber?: React.ReactNode;
  onClickEditJobs?: Types.Devlink.RuntimeProps;
  isPreviewVisible?: Types.Visibility.VisibilityConditions;
  jobLink?: Types.Basic.Link;
  slotJobStatus?: Types.Devlink.Slot;
  slotBottomBar?: Types.Devlink.Slot;
  slotSidebar?: Types.Devlink.Slot;
  slotTabs?: Types.Devlink.Slot;
  slotFilterBlock?: Types.Devlink.Slot;
  slotCandidatesList?: Types.Devlink.Slot;
  onclickSelectAll?: Types.Devlink.RuntimeProps;
  isListTopBarVisible?: Types.Visibility.VisibilityConditions;
  isInterviewVisible?: Types.Visibility.VisibilityConditions;
  isAllChecked?: Types.Visibility.VisibilityConditions;
  slotResumeSort?: Types.Devlink.Slot;
  slotNameSort?: Types.Devlink.Slot;
  slotInterviewSort?: Types.Devlink.Slot;
  slotEmailSort?: Types.Devlink.Slot;
  slotDateSort?: Types.Devlink.Slot;
  onclickHeaderJobs?: Types.Devlink.RuntimeProps;
  isFiltersVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
