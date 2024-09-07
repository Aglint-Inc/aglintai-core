import * as React from "react";
import * as Types from "./types";

declare function ResumeTag(props: {
  as?: React.ElementType;
  props?: Types.Devlink.RuntimeProps;
  slotText?: Types.Devlink.Slot;
  isErrorIcon?: Types.Visibility.VisibilityConditions;
  isLoading?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
