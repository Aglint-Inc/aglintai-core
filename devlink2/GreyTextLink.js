"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./GreyTextLink.module.css";

export function GreyTextLink({
  as: _Component = _Builtin.Block,
  textLink = "Approve",
  onClickLink = {},
}) {
  return (
    <_Component tag="div" {...onClickLink}>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-grey-600", "text-underline")}
        tag="div"
      >
        {textLink}
      </_Builtin.Block>
    </_Component>
  );
}
