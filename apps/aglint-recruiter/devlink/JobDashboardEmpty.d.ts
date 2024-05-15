import * as React from "react";
import * as Types from "./types";

declare function JobDashboardEmpty(props: {
  as?: React.ElementType;
  onClickHowItWorks?: Types.Devlink.RuntimeProps;
  onClickRequestIntegration?: Types.Devlink.RuntimeProps;
  slotImport?: Types.Devlink.Slot;
  onClickAddJob?: Types.Devlink.RuntimeProps;
  onClickGreenHouse?: Types.Devlink.RuntimeProps;
  textHeader?: React.ReactNode;
  onClickAshby?: Types.Devlink.RuntimeProps;
  onClickLever?: Types.Devlink.RuntimeProps;
  isOldTitleVisible?: Types.Visibility.VisibilityConditions;
  isSelectTitleVisible?: Types.Visibility.VisibilityConditions;
  slotAts?: Types.Devlink.Slot;
  isAtsOptionVisible?: Types.Visibility.VisibilityConditions;
  isConnectedVisible?: Types.Visibility.VisibilityConditions;
  isGreenhouseConnected?: Types.Visibility.VisibilityConditions;
  isAshbyConnected?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
