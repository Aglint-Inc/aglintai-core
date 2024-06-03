"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InputText.module.css";

export function InputText({
  as: _Component = _Builtin.Block,
  textInput = "Javascript",
  onClickInput = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "frame-977")}
      tag="div"
      {...onClickInput}
    >
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {textInput}
      </_Builtin.Block>
    </_Component>
  );
}
