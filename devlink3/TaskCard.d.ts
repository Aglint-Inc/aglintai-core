import * as React from "react";
import * as Types from "./types";

declare function TaskCard(props: {
  as?: React.ElementType;
  textTitle?: React.ReactNode;
  slotTaskInline?: Types.Devlink.Slot;
  onClickAddTask?: Types.Devlink.RuntimeProps;
  slotNewTask?: Types.Devlink.Slot;
  isNewTaskVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
