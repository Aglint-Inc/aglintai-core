import * as React from "react";
import * as Types from "./types";

declare function AssistantChat(props: {
  as?: React.ElementType;
  slotLogo?: Types.Devlink.Slot;
  textMessage?: React.ReactNode;
  slotLottieLoadingChat?: Types.Devlink.Slot;
  isLoadingChatVisible?: Types.Visibility.VisibilityConditions;
  isMessageVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
