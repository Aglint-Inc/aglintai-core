import * as React from "react";
import * as Types from "./types";

declare function AgentLayout(props: {
  as?: React.ElementType;
  slotAgentTask?: Types.Devlink.Slot;
  textCurrentTaskName?: React.ReactNode;
  onClickTaskActivity?: Types.Devlink.RuntimeProps;
  slotChat?: Types.Devlink.Slot;
  slotTimelineBlock?: Types.Devlink.Slot;
  onClickNewTask?: Types.Devlink.RuntimeProps;
  isSearch?: Types.Visibility.VisibilityConditions;
  slotSearchInput?: Types.Devlink.Slot;
  onClickSend?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
