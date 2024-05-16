"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./HeaderWithSlot.module.css";

export function HeaderWithSlot({
  as: _Component = _Builtin.Block,
  isCoordinatorVisible = true,
  slotCoordinators,
  textHeading = "Co-ordinator",
}) {
  return isCoordinatorVisible ? (
    <_Component className={_utils.cx(_styles, "div-block-1423")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {textHeading}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1426")}
        tag="div"
      >
        {slotCoordinators}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
