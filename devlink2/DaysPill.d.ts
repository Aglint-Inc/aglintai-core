import * as React from "react";
import * as Types from "./types";

declare function DaysPill(props: {
  as?: React.ElementType;
  textDay?: React.ReactNode;
  onClickDay?: Types.Devlink.RuntimeProps;
  isActive?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
