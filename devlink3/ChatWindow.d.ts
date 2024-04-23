import * as React from "react";
import * as Types from "./types";

declare function ChatWindow(props: {
  as?: React.ElementType;
  slotChatBlocks?: Types.Devlink.Slot;
}): React.JSX.Element;
