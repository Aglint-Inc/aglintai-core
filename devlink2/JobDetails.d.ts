import * as React from "react";
import * as Types from "./types";

declare function JobDetails(props: {
  as?: React.ElementType;
  onClickEditJobs?: Types.Devlink.RuntimeProps;
  isPreviewVisible?: Types.Visibility.VisibilityConditions;
  jobLink?: Types.Basic.Link;
  slotSidebar?: Types.Devlink.Slot;
  slotTabs?: Types.Devlink.Slot;
  slotFilters?: Types.Devlink.Slot;
  onclickAddCandidates?: Types.Devlink.RuntimeProps;
  slotTable?: Types.Devlink.Slot;
  slotRefresh?: Types.Devlink.Slot;
  slotPagination?: Types.Devlink.Slot;
  isFetchingPillVisible?: Types.Visibility.VisibilityConditions;
  textStatus?: React.ReactNode;
  isTextStatusVisible?: Types.Visibility.VisibilityConditions;
  slotLoadingLottie?: Types.Devlink.Slot;
  isEmptyTextVisible?: Types.Visibility.VisibilityConditions;
  isWarningVisible?: Types.Visibility.VisibilityConditions;
  isImportCandidates?: Types.Visibility.VisibilityConditions;
  slotBreadcrumb?: Types.Devlink.Slot;
}): React.JSX.Element;
