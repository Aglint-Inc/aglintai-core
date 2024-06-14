import * as React from "react";
import * as Types from "./types";

declare function DatePicker(props: {
  as?: React.ElementType;
  textMonth?: React.ReactNode;
  textDate?: React.ReactNode;
  textDay?: React.ReactNode;
  isActive?: Types.Visibility.VisibilityConditions;
  onClickDate?: Types.Devlink.RuntimeProps;
  isDisable?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
