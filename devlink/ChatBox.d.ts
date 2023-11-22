import * as React from "react";
import * as Types from "./types";

declare function ChatBox(props: {
  as?: React.ElementType;
  textCompanyName?: React.ReactNode;
  slotLogo?: Types.Devlink.Slot;
  slotChat?: Types.Devlink.Slot;
  slotChatInput?: Types.Devlink.Slot;
  onClickScroll?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
