import * as React from "react";
import * as Types from "./types";

declare function AshbyAtsJob(props: {
  as?: React.ElementType;
  textNumberOfJobs?: React.ReactNode;
  isImportDisable?: Types.Visibility.VisibilityConditions;
  onClickImport?: Types.Devlink.RuntimeProps;
  onClickAll?: Types.Devlink.RuntimeProps;
  onClickPublished?: Types.Devlink.RuntimeProps;
  onClickClosed?: Types.Devlink.RuntimeProps;
  slotAtsCard?: Types.Devlink.Slot;
}): React.JSX.Element;
