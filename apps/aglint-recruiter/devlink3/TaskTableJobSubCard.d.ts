import * as React from "react";
import * as Types from "./types";

declare function TaskTableJobSubCard(props: {
  as?: React.ElementType;
  slotCheckbox?: Types.Devlink.Slot;
  slotStatus?: Types.Devlink.Slot;
  textTask?: React.ReactNode;
  slotAssignedTo?: Types.Devlink.Slot;
  isCardActive?: Types.Visibility.VisibilityConditions;
  onClickCard?: Types.Devlink.RuntimeProps;
  slotPriorityPill?: Types.Devlink.Slot;
  isOverdueVisible?: Types.Visibility.VisibilityConditions;
  textOverdue?: React.ReactNode;
}): React.JSX.Element;
