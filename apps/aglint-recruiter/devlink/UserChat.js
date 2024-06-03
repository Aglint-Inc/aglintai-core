"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./UserChat.module.css";

export function UserChat({
  as: _Component = _Builtin.Block,
  textMessage = "This is some text inside of a div block.",
  textPdfName = "This is some text inside of a div block.",
  isUserMessageVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "sender-wrap")} tag="div">
      {isUserMessageVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "sender-sub-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-block-28")}
            tag="div"
          >
            {textMessage}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
