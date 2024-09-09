"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SchedulerDashList } from "./SchedulerDashList";
import * as _utils from "./utils";
import _styles from "./SchedulerDashMenu.module.css";

export function SchedulerDashMenu({
  as: _Component = _Builtin.Block,
  slotDashList,
  textHeader = "Scheduler",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "scheduler_dash_option")}
      tag="div"
    >
      <Text content={textHeader} size="1" color="neutral" />
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-dash-menu")}
        tag="div"
      >
        {slotDashList ?? <SchedulerDashList />}
      </_Builtin.Block>
    </_Component>
  );
}