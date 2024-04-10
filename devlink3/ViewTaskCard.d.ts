import * as React from "react";
import * as Types from "./types";

declare function ViewTaskCard(props: {
  as?: React.ElementType;
  textTaskName?: React.ReactNode;
  textDate?: React.ReactNode;
  slotAgentPill?: Types.Devlink.Slot;
  onClickMark?: Types.Devlink.RuntimeProps;
  textMark?: React.ReactNode;
  slotOwner?: Types.Devlink.Slot;
  isMarkVisible?: Types.Visibility.VisibilityConditions;
  slotTaskStatus?: Types.Devlink.Slot;
}): React.JSX.Element;
