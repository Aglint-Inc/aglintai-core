"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./EmptyState.module.css";

export function EmptyState({
  as: _Component = _Builtin.Block,
  textDescription = "No Schedules",
  slotIcons,
}) {
  return (
    <_Component className={_utils.cx(_styles, "empty-state-gen")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1155")}
        tag="div"
      >
        <_Builtin.Block tag="div">{slotIcons}</_Builtin.Block>
        <_Builtin.Block tag="div">{textDescription}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
