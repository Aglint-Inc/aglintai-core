"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
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
  isAudioPlayVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "sound-track-wrap")} tag="div">
      {isAudioPlayVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "st-header-wrap")}
          tag="div"
        >
          {slotAudioPlay}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "st-body-wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "st-sub-body-wrap")}
          tag="div"
        >
          {isShowVisible ? (
            <_Builtin.Block tag="div" {...onClickShow}>
              <Text weight="medium" color="accent" content="" />
            </_Builtin.Block>
          ) : null}
          {isHideVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cursor-pointer")}
              tag="div"
              {...onClickHide}
            >
              <Text content="" weight="" color="accent" />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "st-transcript-wrap")}
          tag="div"
        >
          {slotTranscript}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
