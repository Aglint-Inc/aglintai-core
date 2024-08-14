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
  styleEmpty = {},
  size = "7",
  slotButton,
  sizes,
  textSubDesc = "Heading",
  isSubDescVisible = false,
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
        <GlobalIcon iconName={iconName} size={size} color="inherit" />
        <_Builtin.Block
          className={_utils.cx(_styles, "ges-text-wrapper")}
          tag="div"
        >
          <Text content={textDesc} />
          {isSubDescVisible ? (
            <_Builtin.Block tag="div">
              <Text content={textSubDesc} color="neutral" />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_for_button")}
          tag="div"
        >
          {slotButton}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
