import * as React from "react";
import * as Types from "./types";

declare function TaskTable(props: {
  as?: React.ElementType;
  slotTaskTableCard?: Types.Devlink.Slot;
  onClickNewTask?: Types.Devlink.RuntimeProps;
  isNewTaskCardVisible?: Types.Visibility.VisibilityConditions;
  slotFilter?: Types.Devlink.Slot;
  slotCheckbox?: Types.Devlink.Slot;
}): React.JSX.Element;
