import * as React from "react";
import * as Types from "./types";

declare function SubMenu(props: {
  as?: React.ElementType;
  textSubMenu?: React.ReactNode;
  isActive?: Types.Visibility.VisibilityConditions;
  onClickMenu?: Types.Devlink.RuntimeProps;
  isWarningVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
