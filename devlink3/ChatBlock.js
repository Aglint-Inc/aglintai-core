import React from "react";
import * as _Builtin from "./_Builtin";
import { SamplePanel } from "./SamplePanel";
import * as _utils from "./utils";
import _styles from "./ChatBlock.module.css";

export function ChatBlock({
  as: _Component = _Builtin.Block,
  testName = "You",
  textTime = "Just Now",
  textMessage = (
    <>
      {"Hey, schedule an interview with "}
      {" for the "}
      {" role."}
    </>
  ),
  slotAvatar,
  slotWidget,
  isWidget = false,
  istext = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "chat_block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "chat_avatar", "is_aglint")}
        tag="div"
      >
        {slotAvatar}
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
              {testName}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey_400")}
              tag="div"
            >
              {textTime}
            </_Builtin.Block>
          </_Builtin.Block>
          {istext ? (
            <_Builtin.Block tag="div">{textMessage}</_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        {isWidget ? (
          <_Builtin.Block tag="div">
            {slotWidget ?? <SamplePanel />}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
