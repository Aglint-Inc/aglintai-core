"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Reason.module.css";

export function Reason({
  as: _Component = _Builtin.Block,
  slotReasonDropdown,
  slotReasonGraph,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "reason-outer-wrap")}
      id={_utils.cx(
        _styles,
        "w-node-c05658ea-f227-231f-ec49-03a32c86500a-2c86500a"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "reason-header-wrap")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Reasons"}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotReasonDropdown}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">{slotReasonGraph}</_Builtin.Block>
    </_Component>
  );
}
