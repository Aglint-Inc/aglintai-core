import * as React from "react";
import * as Types from "./types";

declare function Breadcrum(props: {
  as?: React.ElementType;
  onClickLink?: Types.Devlink.RuntimeProps;
  isLink?: Types.Visibility.VisibilityConditions;
  textName?: React.ReactNode;
  showArrow?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
