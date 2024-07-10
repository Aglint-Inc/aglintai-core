"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Text.module.css";

export function Text({
  as: _Component = _Builtin.Block,
  size = "2",
  weight = "regular",
  align = "left",
  content = "Heading",
  color = "neutral-12",
  highContrast = "false",
  text = "This is the default text value",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "global_text")}
      tag="div"
      text-align={align}
      fontSize={size}
      fontWeight={weight}
      font-color={color}
      high-contrast={highContrast}
    >
      {content}
    </_Component>
  );
}
