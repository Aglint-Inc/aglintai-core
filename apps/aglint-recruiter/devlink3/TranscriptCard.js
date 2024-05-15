"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TranscriptCard.module.css";

export function TranscriptCard({
  as: _Component = _Builtin.Block,
  slotAgent,
  textScript = "This is some text inside of a div block.",
  isBackgroundActive = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1372")} tag="div">
      <_Builtin.Block tag="div">{slotAgent}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1370")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "relative-1")} tag="div">
          {textScript}
        </_Builtin.Block>
        {isBackgroundActive ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1371")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
