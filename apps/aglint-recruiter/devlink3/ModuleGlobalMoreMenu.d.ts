import * as React from "react";
import * as Types from "./types";

declare function ModuleGlobalMoreMenu(props: {
  as?: React.ElementType;
  onClickPause?: Types.Devlink.RuntimeProps;
  onClickRemove?: Types.Devlink.RuntimeProps;
  isTrainingModule?: Types.Visibility.VisibilityConditions;
  isQualifiedModule?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
