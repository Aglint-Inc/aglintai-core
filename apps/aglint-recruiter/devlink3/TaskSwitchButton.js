"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./TaskSwitchButton.module.css";

export function TaskSwitchButton({
  as: _Component = _Builtin.Block,
  onClickJobCand = {},
  onClickList = {},
  isListActive = false,
  isJobCandActive = false,
  textFirst = "By Job",
  textSecond = "List",
  isIconVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "task-switch-button-group")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "task_switch_comp")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "taskwitch_individual")}
          tag="div"
          {...onClickJobCand}
        >
          <_Builtin.Block className={_utils.cx(_styles, "text_wrap")} tag="div">
            <Text content={textFirst} weight="medium" color="" size="1" />
          </_Builtin.Block>
          {isJobCandActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "active_wrap")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "taskwitch_individual")}
          tag="div"
          {...onClickList}
        >
          <_Builtin.Block className={_utils.cx(_styles, "text_wrap")} tag="div">
            <Text content={textSecond} weight="medium" color="" size="1" />
          </_Builtin.Block>
          {isListActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "active_wrap")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
