import * as React from "react";
import * as Types from "./types";

declare function WorkflowApplicationScreening(props: {
  as?: React.ElementType;
  isAllChecked?: Types.Visibility.VisibilityConditions;
  onClickAll?: Types.Devlink.RuntimeProps;
  slotRadioButtons?: Types.Devlink.Slot;
}): React.JSX.Element;
