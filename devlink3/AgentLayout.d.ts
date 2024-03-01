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
  slotSuggetionPills?: Types.Devlink.Slot;
  isSuggetionPills?: Types.Visibility.VisibilityConditions;
  slotNewChatButton?: Types.Devlink.Slot;
  onClickEdit?: Types.Devlink.RuntimeProps;
  isEditTaskName?: Types.Visibility.VisibilityConditions;
  slotInlineEditField?: Types.Devlink.Slot;
  isEditIcon?: Types.Visibility.VisibilityConditions;
  slotLottieLoader?: Types.Devlink.Slot;
  isChatLoading?: Types.Visibility.VisibilityConditions;
  slotMoreButton?: Types.Devlink.Slot;
}): React.JSX.Element;
