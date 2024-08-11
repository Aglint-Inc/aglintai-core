"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Requests.module.css";

export function Requests({
  as: _Component = _Builtin.Block,
  slotFilter,
  slotRequestSection,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "req-body-left-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-header-ra")}
        tag="div"
      >
        {slotFilter}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "req-left-body-wrap")}
        tag="div"
      >
        {slotRequestSection}
      </_Builtin.Block>
    </_Component>
  );
}
