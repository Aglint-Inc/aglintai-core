import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TicketChatBubble.module.css";

export function TicketChatBubble({
  as: _Component = _Builtin.Block,
  slotChatImage,
  textName = "Maria Johnson",
  textMessages = "Hi, Im facing internet issues while taking interview. Can you please resend the invitation link because the current invite link is showing expired",
  textTime = "02:21 AM",
}) {
  return (
    <_Component className={_utils.cx(_styles, "inde-chat-bubble")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "inde-chat-profile-image")}
        tag="div"
      >
        {slotChatImage}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "inde-chat-info")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "inde-chat-header-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {textName}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "text-grey-500")}
            tag="div"
          >
            {textTime}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">{textMessages}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
