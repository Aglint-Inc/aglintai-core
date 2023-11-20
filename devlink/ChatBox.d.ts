import * as React from "react";
import * as Types from "./types";

declare function ChatBox(props: {
  as?: React.ElementType;
  textCompanyName?: React.ReactNode;
  slotLogo?: Types.Devlink.Slot;
  slotTypeInput?: Types.Devlink.Slot;
  onClickAttach?: Types.Devlink.RuntimeProps;
  onClickSend?: Types.Devlink.RuntimeProps;
  isSlotTypingVisible?: Types.Visibility.VisibilityConditions;
  slotChat?: Types.Devlink.Slot;
}): React.JSX.Element;
