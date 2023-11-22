import * as React from "react";
import * as Types from "./types";

declare function ChatInput(props: {
  as?: React.ElementType;
  isSlotTypingVisible?: Types.Visibility.VisibilityConditions;
  onClickAttach?: Types.Devlink.RuntimeProps;
  slotTypeInput?: Types.Devlink.Slot;
  onClickSend?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
