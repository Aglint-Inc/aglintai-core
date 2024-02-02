import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AssistantChatMatch.module.css";

export function AssistantChatMatch({
  as: _Component = _Builtin.Block,
  slotProfile,
  textName = "Marvin McKinney",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "chat-profile-list-item")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "chat-profile-list-image")}
        tag="div"
      >
        {slotProfile}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {textName}
      </_Builtin.Block>
      <_Builtin.Block tag="div">{"Top Match - 92%"}</_Builtin.Block>
    </_Component>
  );
}
