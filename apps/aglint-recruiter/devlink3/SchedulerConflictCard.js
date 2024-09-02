"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./SchedulerConflictCard.module.css";

export function SchedulerConflictCard({
  as: _Component = _Builtin.Block,
  textNumberNoConflicts = "0",
  slotNoConflictToggle,
  isNoConflictActive = false,
  slotCountText,
  slotIcon,
  slotToggleWithText,
  slotInfoIcon,
}) {
  return (
    <_Component className={_utils.cx(_styles, "conflict_block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "conflict_block_head")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "conflict-number-wrap")}
          tag="div"
        >
          {slotCountText ?? (
            <>
              <Text content={textNumberNoConflicts} size="6" color="success" />
              <Text content="No Conflicts" weight="medium" color="success" />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sf-bottom-block")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "relative-1")} tag="div">
          {slotToggleWithText}
        </_Builtin.Block>
      </_Builtin.Block>
      {isNoConflictActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "conflict_block_active")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
