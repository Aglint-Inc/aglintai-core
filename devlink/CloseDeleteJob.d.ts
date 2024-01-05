import * as React from "react";
import * as Types from "./types";

declare function CloseDeleteJob(props: {
  as?: React.ElementType;
  isCloseJobVisible?: Types.Visibility.VisibilityConditions;
  isDeleteJobVisible?: Types.Visibility.VisibilityConditions;
  onClickClose?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
