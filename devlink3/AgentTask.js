import React from "react";
import * as _Builtin from "./_Builtin";
import { Timeline } from "./Timeline";
import * as _utils from "./utils";
import _styles from "./AgentTask.module.css";

export function AgentTask({
  as: _Component = _Builtin.Block,
  slotTimeline,
  textTaskName = "Schedule interview with john between 12-19 February.",
  onClickCard = {},
  isActive = false,
  isTimeline = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "task_card")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "fw-semibold", "relative_2")}
        tag="div"
      >
        {textTaskName}
      </_Builtin.Block>
      {isTimeline ? (
        <_Builtin.Block className={_utils.cx(_styles, "relative_2")} tag="div">
          {slotTimeline ?? <Timeline />}
        </_Builtin.Block>
      ) : null}
      {isActive ? (
        <_Builtin.Block className={_utils.cx(_styles, "active_bg")} tag="div" />
      ) : null}
    </_Component>
  );
}
