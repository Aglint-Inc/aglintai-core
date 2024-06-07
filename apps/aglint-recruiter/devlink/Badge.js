"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./Badge.module.css";

export function Badge({
  as: _Component = _Builtin.Block,
  colorProps = {},
  text = "⚒️ Skilled",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "badge")}
      tag="div"
      {...colorProps}
    >
      <Text content={text} size="1" />
    </_Component>
  );
}
