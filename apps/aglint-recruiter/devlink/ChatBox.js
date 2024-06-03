"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AssistantChat } from "./AssistantChat";
import { UserChat } from "./UserChat";
import { UserChatIcon } from "./UserChatIcon";
import { ChatInput } from "./ChatInput";
import * as _utils from "./utils";
import _styles from "./ChatBox.module.css";

export function ChatBox({
  as: _Component = _Builtin.Block,
  textCompanyName = "",
  slotLogo,
  slotChat,
  slotChatInput,
  onClickScroll = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "chat-box-menu-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "chat-head-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-590")}
          tag="div"
        >
          {slotLogo}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-xl", "fw-bold")}
          tag="div"
        >
          {textCompanyName}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-589")}
        tag="div"
        {...onClickScroll}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-596")}
          tag="div"
        >
          {slotChat ?? (
            <>
              <AssistantChat />
              <UserChat />
              <UserChatIcon />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-595")} tag="div">
        {slotChatInput ?? <ChatInput />}
      </_Builtin.Block>
    </_Component>
  );
}
