"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ChatBlockUser.module.css";

export function ChatBlockUser({
  as: _Component = _Builtin.Block,
  textMessage = (
    <>
      {"Hey, schedule an interview with "}
      {" for the "}
      {" role."}
    </>
  ),
  slotUserAvatar,
  textTime = "Just Now",
}) {
  return (
    <_Component className={_utils.cx(_styles, "chat_block")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "chat_avatar")} tag="div">
        {slotUserAvatar ?? (
          <_Builtin.Image
            className={_utils.cx(_styles, "image_cover")}
            loading="eager"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d5a324f1d62490a27df0fd_716f2115474431e82106834a5708dd89.png"
          />
        )}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "chat_content")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "chat_text")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "chat_name_and_time")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"You"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey_400")}
              tag="div"
            >
              {textTime}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block tag="div">{textMessage}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
