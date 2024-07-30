"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./GlobalSwitchPill.module.css";

export function GlobalSwitchPill({
  as: _Component = _Builtin.Block,
  textPill = "By Job",
  isActive = false,
  onClickPill = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "taskwitch_individual")}
      tag="div"
      {...onClickPill}
    >
      <_Builtin.Block className={_utils.cx(_styles, "text_wrap")} tag="div">
        <Text content={textPill} weight="medium" color="" size="1" />
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "active_wrap")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
