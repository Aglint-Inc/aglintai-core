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
  onClickIndeed?: Types.Devlink.RuntimeProps;
  onClickLever?: Types.Devlink.RuntimeProps;
  isOldTitleVisible?: Types.Visibility.VisibilityConditions;
  isSelectTitleVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
