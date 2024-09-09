"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./StatusPill.module.css";

export function StatusPill({
  as: _Component = _Builtin.Block,
  colorBgPropsStatus = {},
  textStatus = "Open",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "il-status", "content")}
      tag="div"
      {...colorBgPropsStatus}
    >
      {textStatus}
    </_Component>
  );
}