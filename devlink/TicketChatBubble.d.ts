import * as React from "react";
import * as Types from "./types";

declare function TicketChatBubble(props: {
  as?: React.ElementType;
  slotChatImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textMessages?: React.ReactNode;
  textTime?: React.ReactNode;
}): React.JSX.Element;
