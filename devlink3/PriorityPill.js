"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./PriorityPill.module.css";

export function PriorityPill({
  as: _Component = _Builtin.Block,
  isHighVisible = true,
  isLowVisible = false,
  isMediumVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1540")} tag="div">
      {isHighVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1539")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"High"}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isLowVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1539", "green")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Low"}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isMediumVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1539", "yellow")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Medium"}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
