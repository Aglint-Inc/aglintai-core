"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./GlobalIcon.module.css";

export function GlobalIcon({
  as: _Component = _Builtin.Block,
  size = "4",
  weight = "medium",
  color = "inherit",
  iconName = "shapes",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "icon_general")}
      tag="div"
      icon-font="true"
      icon-size={size}
      icon-weight={weight}
      icon-color={color}
    >
      <_Builtin.Block tag="div">{iconName}</_Builtin.Block>
    </_Component>
  );
}
