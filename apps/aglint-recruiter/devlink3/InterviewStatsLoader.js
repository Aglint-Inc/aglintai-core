"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewStatsLoader.module.css";

export function InterviewStatsLoader({
  as: _Component = _Builtin.Block,
  slotSkeleton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1507")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1508")}
        id={_utils.cx(
          _styles,
          "w-node-_8c809f8b-a051-93b7-5121-5291b6b58147-b6b58146"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1601")}
          tag="div"
        >
          {slotSkeleton}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1508")}
        id={_utils.cx(
          _styles,
          "w-node-_8c809f8b-a051-93b7-5121-5291b6b58149-b6b58146"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1601", "small")}
          tag="div"
        >
          {slotSkeleton}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1508")}
        id={_utils.cx(
          _styles,
          "w-node-_8c809f8b-a051-93b7-5121-5291b6b5814b-b6b58146"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1601", "small")}
          tag="div"
        >
          {slotSkeleton}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
