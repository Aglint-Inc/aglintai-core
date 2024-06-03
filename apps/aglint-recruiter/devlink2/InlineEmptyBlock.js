"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InlineEmptyBlock.module.css";

export function InlineEmptyBlock({
  as: _Component = _Builtin.Block,
  textEmptyMessage = "No Interviewer Selected ",
}) {
  return (
    <_Component className={_utils.cx(_styles, "inline_empty_state")} tag="div">
      <_Builtin.Block tag="div">{textEmptyMessage}</_Builtin.Block>
    </_Component>
  );
}
