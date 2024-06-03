"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ButtonTextGrey.module.css";

export function ButtonTextGrey({
  as: _Component = _Builtin.Block,
  buttonText = "Button",
  onClickCancel = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "button-text-grey-600")}
      tag="div"
      {...onClickCancel}
    >
      <_Builtin.Block tag="div">{buttonText}</_Builtin.Block>
    </_Component>
  );
}
