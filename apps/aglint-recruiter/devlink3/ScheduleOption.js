"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./ScheduleOption.module.css";

export function ScheduleOption({
  as: _Component = _Builtin.Block,
  isSelected = false,
  isCheckbox = true,
  slotSingleDaySchedule,
  isCheckboxAndRadio = true,
  slotCheckbox,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "schedule_option_wrap")}
      tag="div"
    >
      {isCheckboxAndRadio ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "selection_wrap")}
          tag="div"
        >
          {isCheckbox ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "radio_wrap")}
              tag="div"
            >
              {slotCheckbox}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "detail_schedules")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slotsingleday_schedule")}
          tag="div"
        >
          {slotSingleDaySchedule ?? (
            <>
              <SlotComp componentNeme="SingleDaySchedule" />
              <SlotComp componentNeme="SingleDaySchedule" />
            </>
          )}
        </_Builtin.Block>
        {isSelected ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "selected_absolute")}
            tag="div"
          />
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "normal_border")}
          tag="div"
        />
      </_Builtin.Block>
    </_Component>
  );
}
