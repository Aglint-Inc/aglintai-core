"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./GlobalIcon.module.css";

export function GlobalIcon({
  as: _Component = _Builtin.Block,
  iconName = "shapes",
  size = "2",
  weight = "medium",
  color = "inherit",
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
      <_Builtin.Block
        className={_utils.cx(_styles, "icon-text-wrap")}
        tag="div"
      >
        {iconName}
      </_Builtin.Block>
    </_Component>
  );
}
