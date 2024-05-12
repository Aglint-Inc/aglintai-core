import * as React from "react";
import * as Types from "./types";

declare function SelectAllblock(props: {
  as?: React.ElementType;
  onClickSelectAll?: Types.Devlink.RuntimeProps;
  isSelectedAll?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
