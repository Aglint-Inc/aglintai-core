"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SelectAllblock.module.css";

export function SelectAllblock({
  as: _Component = _Builtin.Block,
  onClickSelectAll = {},
  isSelectedAll = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "select_all")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "block_select_all")}
        tag="div"
        {...onClickSelectAll}
      >
        <_Builtin.Block tag="div">{"Select all members"}</_Builtin.Block>
      </_Builtin.Block>
      {isSelectedAll ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "block_select_all-sj-nf")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"All Members selected"}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
