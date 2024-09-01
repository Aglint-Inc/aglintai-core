"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewersCardList.module.css";

export function InterviewersCardList({
  as: _Component = _Builtin.Block,
  textName = "C++ Coding",
  textUpcoming = "10",
  textCompleted = "2",
  textDeclined = "2",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "module_row", "interviewers")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "sd_table_header_cell")}
        id={_utils.cx(
          _styles,
          "w-node-_78095933-805f-6577-6118-8958f555d8cf-f555d8ce"
        )}
        tag="div"
      >
        <_Builtin.Block tag="div">{textName}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "icl_table_header_cell")}
        id={_utils.cx(
          _styles,
          "w-node-_78095933-805f-6577-6118-8958f555d8d2-f555d8ce"
        )}
        tag="div"
      >
        <_Builtin.Block tag="div">{textUpcoming}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "icl_table_header_cell")}
        id={_utils.cx(
          _styles,
          "w-node-_78095933-805f-6577-6118-8958f555d8d5-f555d8ce"
        )}
        tag="div"
      >
        <_Builtin.Block tag="div">{textCompleted}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "icl_table_header_cell")}
        id={_utils.cx(
          _styles,
          "w-node-_78095933-805f-6577-6118-8958f555d8d8-f555d8ce"
        )}
        tag="div"
      >
        <_Builtin.Block tag="div">{textDeclined}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
