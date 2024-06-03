"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AssistantChat.module.css";

export function AssistantChat({
  as: _Component = _Builtin.Block,
  slotLogo,
  textMessage = (
    <>
      {
        "This tutorial covers every version of JavaScript: The Original JavaScript ES1 ES2 ES3 (1997-1999) The First Main Revision ES5 (2009) The Second Revision ES6 (2015) All Yearly Additions (2016, 2017, 2018, 2019, 2020)"
      }
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  ),
  slotLottieLoadingChat,
  isLoadingChatVisible = false,
  isMessageVisible = true,
  isLogoVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "assisstant-chat")} tag="div">
      {isLogoVisible ? (
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "assissatant-logo-wrap")}
            tag="div"
          >
            {slotLogo}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "div-block-591")} tag="div">
        {isMessageVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "text-block-27")}
            tag="div"
          >
            {textMessage}
          </_Builtin.Block>
        ) : null}
        {isLoadingChatVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-594")}
            tag="div"
          >
            {slotLottieLoadingChat}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
