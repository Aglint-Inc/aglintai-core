"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ButtonDanger.module.css";

export function ButtonDanger({
  as: _Component = _Builtin.Block,
  textLabel = "Cancel",
  onClickButton = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1679", "danger")}
      tag="div"
      {...onClickButton}
    >
      <_Builtin.Block tag="div">{textLabel}</_Builtin.Block>
    </_Component>
  );
}
