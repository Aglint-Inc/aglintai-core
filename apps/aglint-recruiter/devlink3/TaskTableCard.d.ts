import * as React from "react";
import * as Types from "./types";

declare function TaskTableCard(props: {
  as?: React.ElementType;
  slotCheckbox?: Types.Devlink.Slot;
  slotStatus?: Types.Devlink.Slot;
  textTask?: React.ReactNode;
  textJob?: React.ReactNode;
  slotCandidate?: Types.Devlink.Slot;
  isActiveCard?: Types.Visibility.VisibilityConditions;
  slotAssignedToCard?: Types.Devlink.Slot;
  onClickCard?: Types.Devlink.RuntimeProps;
  slotPriority?: Types.Devlink.Slot;
  onClickOverview?: Types.Devlink.RuntimeProps;
  isOverdueVisible?: Types.Visibility.VisibilityConditions;
  textOverdue?: React.ReactNode;
}): React.JSX.Element;
