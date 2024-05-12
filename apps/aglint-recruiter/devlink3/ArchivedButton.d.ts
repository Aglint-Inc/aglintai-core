import * as React from "react";
import * as Types from "./types";

declare function ArchivedButton(props: {
  as?: React.ElementType;
  isHideVisible?: Types.Visibility.VisibilityConditions;
  isShowVisible?: Types.Visibility.VisibilityConditions;
  onClickShow?: Types.Devlink.RuntimeProps;
  onClickHide?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
