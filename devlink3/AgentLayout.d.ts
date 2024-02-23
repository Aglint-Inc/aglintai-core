import * as React from "react";
import * as Types from "./types";

declare function AgentLayout(props: {
  as?: React.ElementType;
  slotAgentTask?: Types.Devlink.Slot;
  textCurrentTaskName?: React.ReactNode;
  onClickTaskActivity?: Types.Devlink.RuntimeProps;
  slotChat?: Types.Devlink.Slot;
  slotTimelineBlock?: Types.Devlink.Slot;
  isSearch?: Types.Visibility.VisibilityConditions;
  slotSearchInput?: Types.Devlink.Slot;
  onClickSend?: Types.Devlink.RuntimeProps;
  isActivity?: Types.Visibility.VisibilityConditions;
  onClickSchedulerAgent?: Types.Devlink.RuntimeProps;
  onClickJobAssistant?: Types.Devlink.RuntimeProps;
  onClickSourcingAgent?: Types.Devlink.RuntimeProps;
  onClickScreeningAgent?: Types.Devlink.RuntimeProps;
  slotSuggetionPills?: Types.Devlink.Slot;
  isSuggetionPills?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
