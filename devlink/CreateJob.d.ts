import * as React from "react";
import * as Types from "./types";

declare function CreateJob(props: {
  as?: React.ElementType;
  onClickCreateNewJob?: Types.Devlink.RuntimeProps;
  onClickLeverImport?: Types.Devlink.RuntimeProps;
  isGreenhouseVisible?: Types.Visibility.VisibilityConditions;
  isAshbyVisible?: Types.Visibility.VisibilityConditions;
  onClickGreenhouse?: Types.Devlink.RuntimeProps;
  onClickAshby?: Types.Devlink.RuntimeProps;
  onClickRequestIntegration?: Types.Devlink.RuntimeProps;
  isLeverConnected?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
