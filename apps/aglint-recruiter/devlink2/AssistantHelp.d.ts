import * as React from "react";
import * as Types from "./types";

declare function AssistantHelp(props: {
  as?: React.ElementType;
  onClickSchedulerAgent?: Types.Devlink.RuntimeProps;
  onClickSourcingAgent?: Types.Devlink.RuntimeProps;
  onClickScreeningAgent?: Types.Devlink.RuntimeProps;
  onClickCareerChatbot?: Types.Devlink.RuntimeProps;
  onClickSend?: Types.Devlink.RuntimeProps;
  slotChatInput?: Types.Devlink.Slot;
  isSlotChatVisible?: Types.Visibility.VisibilityConditions;
  isChatDashVisible?: Types.Visibility.VisibilityConditions;
  slotMessage?: Types.Devlink.Slot;
}): React.JSX.Element;
