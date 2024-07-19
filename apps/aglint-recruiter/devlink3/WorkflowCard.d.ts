import * as React from "react";
import * as Types from "./types";

declare function WorkflowCard(props: {
  as?: React.ElementType;
  textWorkflowTrigger?: React.ReactNode;
  textJobs?: React.ReactNode;
  textWorkflowName?: React.ReactNode;
  onClickEdit?: Types.Devlink.RuntimeProps;
  onClickDelete?: Types.Devlink.RuntimeProps;
  slotCheckbox?: Types.Devlink.Slot;
  isCheckboxVisible?: Types.Visibility.VisibilityConditions;
  isChecked?: Types.Visibility.VisibilityConditions;
  isEditButton?: Types.Visibility.VisibilityConditions;
  showButtons?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
