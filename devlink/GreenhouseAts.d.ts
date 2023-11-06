import * as React from "react";
import * as Types from "./types";

declare function GreenhouseAts(props: {
  as?: React.ElementType;
  onClickAll?: Types.Devlink.RuntimeProps;
  onClickOpen?: Types.Devlink.RuntimeProps;
  onClickClosed?: Types.Devlink.RuntimeProps;
  slotSearch?: Types.Devlink.Slot;
  textNumberofJobs?: React.ReactNode;
  onClickImport?: Types.Devlink.RuntimeProps;
  isImportDisable?: Types.Visibility.VisibilityConditions;
  isAllActive?: Types.Visibility.VisibilityConditions;
  isOpenActive?: Types.Visibility.VisibilityConditions;
  isClosedActive?: Types.Visibility.VisibilityConditions;
  slotAtsCard?: Types.Devlink.Slot;
  isSelected?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
