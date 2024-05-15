import * as React from "react";
import * as Types from "./types";

declare function TabMenuButton(props: {
  as?: React.ElementType;
  textMenu?: React.ReactNode;
  isButtonActive?: Types.Visibility.VisibilityConditions;
  onClickProps?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
