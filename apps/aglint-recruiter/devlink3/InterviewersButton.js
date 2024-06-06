"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./InterviewersButton.module.css";

export function InterviewersButton({
  as: _Component = _Builtin.Block,
  isQualifiedActive = false,
  onClickQualified = {},
  onClickTraining = {},
  isTrainingActive = false,
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
          {...onClickQualified}
        >
          <_Builtin.Block className={_utils.cx(_styles, "text_wrap")} tag="div">
            <Text weight="medium" content="Qualified" color="" />
          </_Builtin.Block>
          {isQualifiedActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "active_wrap")}
              tag="div"
              box-shadow="1"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "taskwitch_individual")}
          tag="div"
          {...onClickTraining}
        >
          <_Builtin.Block className={_utils.cx(_styles, "text_wrap")} tag="div">
            <Text weight="medium" content="Training" color="" />
          </_Builtin.Block>
          {isTrainingActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "active_wrap")}
              tag="div"
              box-shadow="1"
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
