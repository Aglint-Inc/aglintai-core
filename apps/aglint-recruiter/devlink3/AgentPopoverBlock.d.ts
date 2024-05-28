import * as React from "react";
import * as Types from "./types";

declare function AgentPopoverBlock(props: {
  as?: React.ElementType;
  onClickMailAgent?: Types.Devlink.RuntimeProps;
  isMailAgent?: Types.Visibility.VisibilityConditions;
  onClickPhoneAgent?: Types.Devlink.RuntimeProps;
  isPhoneAgent?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
