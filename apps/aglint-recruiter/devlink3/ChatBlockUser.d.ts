import * as React from "react";
import * as Types from "./types";

declare function ChatBlockUser(props: {
  as?: React.ElementType;
  textMessage?: React.ReactNode;
  slotUserAvatar?: Types.Devlink.Slot;
  textTime?: React.ReactNode;
}): React.JSX.Element;
