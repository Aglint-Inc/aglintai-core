"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { DateOption } from "./DateOption";
import { EmptySlots } from "./EmptySlots";
import * as _utils from "./utils";
import _styles from "./ScheduleOptionsList.module.css";

export function ScheduleOptionsList({
  as: _Component = _Builtin.Block,
  slotDateOption,
  slotToggle,
  slotfilters,
  slotDescription,
}) {
  return (
    <_Component className={_utils.cx(_styles, "scheduleoptions")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "schedule_option_hint")}
        tag="div"
      >
        {slotDescription}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "schedule_options")}
        tag="div"
      >
        {slotDateOption ?? (
          <>
            <DateOption isSelected={false} />
            <DateOption isSelected={false} />
            <DateOption isSelected={false} />
            <DateOption isSelected={false} />
            <EmptySlots />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
