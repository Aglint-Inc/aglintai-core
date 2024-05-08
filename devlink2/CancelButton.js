"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CancelButton.module.css";

export function CancelButton({
  as: _Component = _Builtin.Block,
  onClickButton = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1679")}
      tag="div"
      {...onClickButton}
    >
      <_Builtin.Block tag="div">{"Cancel"}</_Builtin.Block>
    </_Component>
  );
}
