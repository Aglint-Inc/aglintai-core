"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./SchedulerDashList.module.css";

export function SchedulerDashList({
  as: _Component = _Builtin.Block,
  slotIcon,
  text = "Heading",
  isActive = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "scheduler_dash_list")} tag="div">
      <_Builtin.Block tag="div">{slotIcon}</_Builtin.Block>
      <_Builtin.Block tag="div">
        <Text content={text} />
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "scheduler_dash_active")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotIcon}</_Builtin.Block>
          <_Builtin.Block tag="div">
            <Text content={text} />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
