"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function Text({
  as: _Component = _Builtin.Block,
  align = "left",
  size = "2",
  weight = "medium",
  color = "neutral-12",
  highContrast = "false",
  content = "This is a global text component",
}) {
  return (
    <_Component
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
