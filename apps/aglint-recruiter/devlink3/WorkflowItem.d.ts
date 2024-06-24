import * as React from "react";
import * as Types from "./types";

declare function WorkflowItem(props: {
  as?: React.ElementType;
  slotInputFields?: Types.Devlink.Slot;
  textWorkflowType?: React.ReactNode;
  textTypeDescription?: React.ReactNode;
  slotWorkflowIcon?: Types.Devlink.Slot;
  isDeleteVisible?: Types.Visibility.VisibilityConditions;
  onClickDelete?: Types.Devlink.RuntimeProps;
  iconName?: React.ReactNode;
}): React.JSX.Element;
