import * as React from "react";
import * as Types from "./types";

declare function TaskProgress(props: {
  as?: React.ElementType;
  slotImage?: Types.Devlink.Slot;
  textTask?: React.ReactNode;
  textTime?: React.ReactNode;
  isTaskProgressVisible?: Types.Visibility.VisibilityConditions;
  isTaskCompletedVisible?: Types.Visibility.VisibilityConditions;
  onClickViewTranscript?: Types.Devlink.RuntimeProps;
  textTimeCompleted?: React.ReactNode;
  slotMailContent?: Types.Devlink.Slot;
  isLineVisible?: Types.Visibility.VisibilityConditions;
  slotSoundTask?: Types.Devlink.Slot;
  isSoundTaskVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
