"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./StatusPillSmall.module.css";

export function StatusPillSmall({
  as: _Component = _Builtin.Block,
  bgColorPropsStatus = {},
  textStatus = "Open",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "inde-status-block")}
      tag="div"
      {...bgColorPropsStatus}
    >
      {textStatus}
    </_Component>
  );
}
