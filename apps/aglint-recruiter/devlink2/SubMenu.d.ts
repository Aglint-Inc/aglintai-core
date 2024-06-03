import * as React from "react";
import * as Types from "./types";

declare function SubLinkSubMenu(props: {
  as?: React.ElementType;
  isActive?: Types.Visibility.VisibilityConditions;
  textSubMenu?: React.ReactNode;
  onClickSubMenu?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
