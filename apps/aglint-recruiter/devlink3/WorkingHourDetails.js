"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { WorkingDaysList } from "./WorkingDaysList";
import * as _utils from "./utils";
import _styles from "./WorkingHourDetails.module.css";

export function WorkingHourDetails({
  as: _Component = _Builtin.Block,
  slotEdit,
  slotDays,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "worknig-hour-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "whw-header-wrap")}
        tag="div"
      >
        <Text content="Working Hours" />
        <_Builtin.Block tag="div">{slotEdit}</_Builtin.Block>
      </_Builtin.Block>
      <Text
        weight="regular"
        color="neutral"
        content="Set your company's working hours to define the availability for interviews."
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "working-hour-day-wrap")}
        tag="div"
      >
        {slotDays ?? (
          <>
            <WorkingDaysList />
            <WorkingDaysList />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
