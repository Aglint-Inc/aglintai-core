"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TaskStatus.module.css";

export function TaskStatus({
  as: _Component = _Builtin.Block,
  textStatus = "Done",
  bgColorProps = {},
  textColorProps = {},
  isDropIconVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "task_status_wrap")}
      tag="div"
      {...bgColorProps}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "task_status")}
        tag="div"
        {...textColorProps}
      >
        <_Builtin.Block tag="div">{textStatus}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
