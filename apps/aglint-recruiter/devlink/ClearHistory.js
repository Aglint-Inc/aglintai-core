"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ClearHistory.module.css";

export function ClearHistory({
  as: _Component = _Builtin.Block,
  onClickCancel = {},
  onClickClearHistory = {},
  textDesc = "By clicking 'Delete,' you're confirming that you want to remove this search history, and it cannot be undone.",
  textHeader = "Delete Search",
  slotButton,
  slotCloseButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "clear-history-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "clear-history-head")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "one-line-clamp")}
          tag="div"
        >
          {textHeader}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotCloseButton}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "clear-hisitory-text-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textDesc}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "clear-btn-wrap")}
          tag="div"
        >
          {slotButton}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
