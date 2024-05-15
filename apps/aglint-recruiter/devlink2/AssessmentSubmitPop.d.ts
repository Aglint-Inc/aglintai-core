import * as React from "react";
import * as Types from "./types";

declare function AssessmentSubmitPop(props: {
  as?: React.ElementType;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickSubmit?: Types.Devlink.RuntimeProps;
  isLoading?: Types.Visibility.VisibilityConditions;
  slotLoader?: Types.Devlink.Slot;
}): React.JSX.Element;
