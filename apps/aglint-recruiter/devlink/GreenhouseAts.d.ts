import * as React from "react";
import * as Types from "./types";

declare function GreenhouseAts(props: {
  as?: React.ElementType;
  onClickAll?: Types.Devlink.RuntimeProps;
  onClickActive?: Types.Devlink.RuntimeProps;
  onClickClosed?: Types.Devlink.RuntimeProps;
  slotSearch?: Types.Devlink.Slot;
  textNumberofJobs?: React.ReactNode;
  onClickImport?: Types.Devlink.RuntimeProps;
  isImportDisable?: Types.Visibility.VisibilityConditions;
  isAllActive?: Types.Visibility.VisibilityConditions;
  isActiveActive?: Types.Visibility.VisibilityConditions;
  isLiveActive?: Types.Visibility.VisibilityConditions;
  slotAtsCard?: Types.Devlink.Slot;
  isSelected?: Types.Visibility.VisibilityConditions;
  onClickLive?: Types.Devlink.RuntimeProps;
  isClosedActive?: Types.Visibility.VisibilityConditions;
  isAtsMenuVisible?: Types.Visibility.VisibilityConditions;
  slotNewTab?: Types.Devlink.Slot;
}): React.JSX.Element;
