import * as React from "react";
import * as Types from "./types";

declare function CdSavedList(props: {
  as?: React.ElementType;
  onClickViewSavedList?: Types.Devlink.RuntimeProps;
  isSavetoListVisible?: Types.Visibility.VisibilityConditions;
  isViewSavedVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
