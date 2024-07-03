import * as React from "react";
import * as Types from "./types";

declare function JobDetails(props: {
  as?: React.ElementType;
  slotTabs?: Types.Devlink.Slot;
  slotFilters?: Types.Devlink.Slot;
  onclickAddCandidates?: Types.Devlink.RuntimeProps;
  slotTable?: Types.Devlink.Slot;
  slotRefresh?: Types.Devlink.Slot;
  isFetchingPillVisible?: Types.Visibility.VisibilityConditions;
  slotLoadingLottie?: Types.Devlink.Slot;
  isImportCandidates?: Types.Visibility.VisibilityConditions;
  slotBreadcrumb?: Types.Devlink.Slot;
  slotShowFilterButton?: Types.Devlink.Slot;
  isFilterVisible?: Types.Visibility.VisibilityConditions;
  slotButtons?: Types.Devlink.Slot;
  slotGlobalBanner?: Types.Devlink.Slot;
}): React.JSX.Element;
