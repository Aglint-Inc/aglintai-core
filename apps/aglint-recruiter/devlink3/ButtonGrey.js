"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ButtonGrey.module.css";

export function ButtonGrey({
  as: _Component = _Builtin.Block,
  textLabel = "This is some text inside of a div block.",
  onClickButton = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "button_primary", "greay_btn")}
      tag="div"
      {...onClickButton}
    >
      <_Builtin.Block tag="div">{textLabel}</_Builtin.Block>
    </_Component>
  );
}
