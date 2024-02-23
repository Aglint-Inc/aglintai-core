import React from "react";
import * as _Builtin from "./_Builtin";
import { ChatBlock } from "./ChatBlock";
import { ChatNotification } from "./ChatNotification";
import * as _utils from "./utils";
import _styles from "./ChatWindow.module.css";

export function ChatWindow({
  as: _Component = _Builtin.Block,
  slotChatBlocks,
}) {
  return (
    <_Component className={_utils.cx(_styles, "chat_contents")} tag="div">
      {slotChatBlocks ?? (
        <>
          <ChatBlock />
          <ChatBlock />
          <ChatNotification isSubtextVisible={true} />
        </>
      )}
    </_Component>
  );
}
