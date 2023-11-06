import * as React from "react";
import * as Types from "./types";

declare function CloseJob(props: {
  as?: React.ElementType;
  onClickCloseJob?: Types.Devlink.RuntimeProps;
  isTextVisible?: Types.Visibility.VisibilityConditions;
  isDeleteJob?: Types.Visibility.VisibilityConditions;
  isCloseJob?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
