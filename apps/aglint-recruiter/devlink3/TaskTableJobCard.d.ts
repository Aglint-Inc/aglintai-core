import * as React from "react";
import * as Types from "./types";

declare function TaskTableJobCard(props: {
  as?: React.ElementType;
  textRole?: React.ReactNode;
  slotAvatarWithName?: Types.Devlink.Slot;
  onClickNewTask?: Types.Devlink.RuntimeProps;
  isNewTaskInputVisible?: Types.Visibility.VisibilityConditions;
  slotNewTaskCard?: Types.Devlink.Slot;
  slotTaskTableJobCard?: Types.Devlink.Slot;
  onClickDropIcon?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
