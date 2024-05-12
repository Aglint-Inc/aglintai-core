import * as React from "react";
import * as Types from "./types";

declare function AddJobList(props: {
  as?: React.ElementType;
  onClickCheck?: Types.Devlink.RuntimeProps;
  isChecked?: Types.Visibility.VisibilityConditions;
  textJob?: React.ReactNode;
}): React.JSX.Element;
