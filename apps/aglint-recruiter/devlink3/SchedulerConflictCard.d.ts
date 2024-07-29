import * as React from "react";
import * as Types from "./types";

declare function SchedulerConflictCard(props: {
  as?: React.ElementType;
  textNumberNoConflicts?: React.ReactNode;
  slotNoConflictToggle?: Types.Devlink.Slot;
  isNoConflictActive?: Types.Visibility.VisibilityConditions;
  slotCountText?: Types.Devlink.Slot;
  slotIcon?: Types.Devlink.Slot;
  slotToggleWithText?: Types.Devlink.Slot;
  slotInfoIcon?: Types.Devlink.Slot;
}): React.JSX.Element;
