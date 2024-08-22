"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./DarkPill.module.css";

export function DarkPill({
  as: _Component = _Builtin.Block,
  isActive = false,
  textPill = "Pill Text",
  onClickPill = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "dark_pill")}
      tag="div"
      {...onClickPill}
    >
      <Text content={textPill} size="1" weight="regular" />
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "is_active_dark")}
          tag="div"
        >
          <Text content={textPill} size="1" weight="regular" />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
