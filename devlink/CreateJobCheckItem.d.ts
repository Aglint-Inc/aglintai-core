import * as React from "react";
import * as Types from "./types";

declare function CreateJobCheckItem(props: {
  as?: React.ElementType;
  onClickCheck?: Types.Devlink.RuntimeProps;
  isChecked?: Types.Visibility.VisibilityConditions;
  textLabel1?: React.ReactNode;
}): React.JSX.Element;
