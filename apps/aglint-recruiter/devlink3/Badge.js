"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Badge.module.css";

export function Badge({
  as: _Component = _Builtin.Block,
  size = "1",
  bgColor = "1",
  fontSize = "1",
  fontColor = "white",
  colorVariant = "1",
  bgColorVariants = "1",
  color = "accent",
  radius = "none",
  variant,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1787")}
      tag="figure"
      badge-size={size}
      color={color}
      radius={radius}
      variant={variant}
    >
      <_Builtin.Block tag="div">{"Badge"}</_Builtin.Block>
    </_Component>
  );
}
