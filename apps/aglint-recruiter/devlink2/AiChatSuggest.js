"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./AiChatSuggest.module.css";

export function AiChatSuggest({
  as: _Component = _Builtin.Block,
  textHeader = "This is a global text component",
  slotKbd,
  slotList,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "chat-suggest-wrap")}
      tag="div"
      box-shadow="4"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "csw-header-wrap")}
        tag="div"
      >
        <Text content={textHeader} size="1" color="neutral" weight="regular" />
        <_Builtin.Block
          className={_utils.cx(_styles, "csw-icon-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "csw-icon-wrap")}
            tag="div"
          >
            {slotKbd}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "csw-body-wrap")} tag="div">
        {slotList}
      </_Builtin.Block>
    </_Component>
  );
}
