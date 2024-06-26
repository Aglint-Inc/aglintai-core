import * as React from "react";
import * as Types from "./types";

declare function ViewTask(props: {
  as?: React.ElementType;
  onClickClose?: Types.Devlink.RuntimeProps;
  slotTaskCard?: Types.Devlink.Slot;
  slotTaskProgress?: Types.Devlink.Slot;
  textTaskDetail?: React.ReactNode;
  isCancelTaskVisible?: Types.Visibility.VisibilityConditions;
  onClickCancelTask?: Types.Devlink.RuntimeProps;
  onClickPrev?: Types.Devlink.RuntimeProps;
  onClickNext?: Types.Devlink.RuntimeProps;
  isDisablePrev?: Types.Visibility.VisibilityConditions;
  isDisableNext?: Types.Visibility.VisibilityConditions;
  onClickCompleteTask?: Types.Devlink.RuntimeProps;
  isCompleteTaskVisible?: Types.Visibility.VisibilityConditions;
  slotTaskHeader?: Types.Devlink.Slot;
}): React.JSX.Element;
