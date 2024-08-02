import * as React from "react";
import * as Types from "./types";

declare function AiChatSuggest(props: {
  as?: React.ElementType;
  textHeader?: React.ReactNode;
  slotKbd?: Types.Devlink.Slot;
  slotList?: Types.Devlink.Slot;
}): React.JSX.Element;
