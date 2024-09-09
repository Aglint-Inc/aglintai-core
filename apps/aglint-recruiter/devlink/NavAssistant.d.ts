import * as React from "react";
import * as Types from "./types";

declare function NavAssistant(props: {
  as?: React.ElementType;
  isActive?: Types.Visibility.VisibilityConditions;
  onClickNav?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;