import * as React from "react";
import * as Types from "./types";

declare function DatePill(props: {
  as?: React.ElementType;
  isActive?: Types.Visibility.VisibilityConditions;
  textDate?: React.ReactNode;
  onClickDate?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
