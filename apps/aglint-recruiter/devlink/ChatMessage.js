import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ChatMessage.module.css";

export function ChatMessage({
  as: _Component = _Builtin.Block,
  slotProfile,
  textHeading = "You",
  slotMessages,
  slotMessageCard,
  isMessageCardVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "chat-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "chat-profile-image")}
        tag="div"
      >
        {slotProfile}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "chat-content-wrapper")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textHeading}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "chat-content-block")}
          tag="div"
        >
          {slotMessages}
        </_Builtin.Block>
        {isMessageCardVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "chat-content-block", "gap-4")}
            tag="div"
          >
            {slotMessageCard}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
