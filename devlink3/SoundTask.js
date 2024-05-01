"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SoundTask.module.css";

export function SoundTask({
  as: _Component = _Builtin.Block,
  slotAudioPlay,
  slotTranscript,
  isShowVisible = true,
  onClickShow = {},
  isHideVisible = false,
  onClickHide = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1627")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1628")}
        tag="div"
      >
        {slotAudioPlay}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1629")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1630")}
          tag="div"
        >
          {isShowVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "text-blue-500")}
              tag="div"
              {...onClickShow}
            >
              {"Show Transcript"}
            </_Builtin.Block>
          ) : null}
          {isHideVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "text-blue-500")}
              tag="div"
              {...onClickHide}
            >
              {"Hide Transcript"}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotTranscript}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
