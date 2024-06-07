"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Priority.module.css";

export function Priority({
  as: _Component = _Builtin.Block,
  colorTextPriority = {},
  textPriority = "High",
  slotPriorityIcon,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "il-priority", "content")}
      tag="div"
    >
      <_Builtin.Block tag="div" {...colorTextPriority}>
        {textPriority}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "il-priority-icon")}
        tag="div"
      >
        {slotPriorityIcon}
      </_Builtin.Block>
    </_Component>
  );
}
