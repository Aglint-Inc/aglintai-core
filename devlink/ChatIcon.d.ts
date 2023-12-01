import * as React from "react";
import * as Types from "./types";

declare function ChatIcon(props: {
  as?: React.ElementType;
  isMessageIconVisible?: Types.Visibility.VisibilityConditions;
  isCloseIconVisible?: Types.Visibility.VisibilityConditions;
  onClickChat?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
