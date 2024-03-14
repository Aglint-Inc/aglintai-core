import * as React from "react";
import * as Types from "./types";

declare function ModulesMoreMenu(props: {
  as?: React.ElementType;
  isQualifiedModules?: Types.Visibility.VisibilityConditions;
  isTrainingModules?: Types.Visibility.VisibilityConditions;
  onClickPause?: Types.Devlink.RuntimeProps;
  onClickRemove?: Types.Devlink.RuntimeProps;
  textAllmodules?: React.ReactNode;
  textPauseTraining?: React.ReactNode;
  slotResumeIcon?: Types.Devlink.Slot;
}): React.JSX.Element;
