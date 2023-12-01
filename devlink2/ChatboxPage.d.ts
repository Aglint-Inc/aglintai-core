import * as React from "react";
import * as Types from "./types";

declare function ChatboxPage(props: {
  as?: React.ElementType;
  slotSearch?: Types.Devlink.Slot;
  slotCandidateList?: Types.Devlink.Slot;
  slotChatHeader?: Types.Devlink.Slot;
  slotChatBody?: Types.Devlink.Slot;
}): React.JSX.Element;
