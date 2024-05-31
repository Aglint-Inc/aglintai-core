"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AgentTaskLoading.module.css";

export function AgentTaskLoading({
  as: _Component = _Builtin.Block,
  slotSkeleton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "task_card")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "task_type_icon")}
        tag="div"
      >
        {slotSkeleton}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-744")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-743")}
          tag="div"
        >
          {slotSkeleton}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-743", "wfhuwuier")}
          tag="div"
        >
          {slotSkeleton}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
