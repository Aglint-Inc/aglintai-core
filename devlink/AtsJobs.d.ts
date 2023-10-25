import * as React from "react";
import * as Types from "./types";

declare function AtsJobs(props: {
  as?: React.ElementType;
  onClickImport?: Types.Devlink.RuntimeProps;
  isImportDisable?: Types.Visibility.VisibilityConditions;
  slotSearch?: Types.Devlink.Slot;
  onClickAll?: Types.Devlink.RuntimeProps;
  isAllActive?: Types.Visibility.VisibilityConditions;
  onClickPublished?: Types.Devlink.RuntimeProps;
  isPublishedActive?: Types.Visibility.VisibilityConditions;
  onClickInternal?: Types.Devlink.RuntimeProps;
  isInternalActive?: Types.Visibility.VisibilityConditions;
  onClickClosed?: Types.Devlink.RuntimeProps;
  isClosedActive?: Types.Visibility.VisibilityConditions;
  slotAtsCard?: Types.Devlink.Slot;
  slotLogo?: Types.Devlink.Slot;
  textNumberofJobs?: React.ReactNode;
}): React.JSX.Element;
