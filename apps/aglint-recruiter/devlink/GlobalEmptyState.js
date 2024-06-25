"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./GlobalEmptyState.module.css";

export function GlobalEmptyState({
  as: _Component = _Builtin.Block,
  textDesc = "Heading",
  iconName = "shapes",
  backgroundColor = "neutral",
  styleEmpty = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "general-empty-state-wrap")}
      tag="div"
      {...styleEmpty}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "ges-content-wrap")}
        tag="div"
      >
        <GlobalIcon iconName={iconName} size="8" color="inherit" />
        <Text content={textDesc} />
      </_Builtin.Block>
    </_Component>
  );
}
