"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./TimeRangeSelector.module.css";

export function TimeRangeSelector({
  as: _Component = _Builtin.Block,
  slotCheckbox,
  textDay = "Day 1",
  isMultiDay = true,
  slotSelectedTime,
  slotTimeinputs,
  onClickAdd = {},
  slotButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "timerangeselector")} tag="div">
      {isMultiDay ? (
        <_Builtin.Block tag="div">
          <Text content={textDay} color="neutral" weight="" />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_selected_time")}
        tag="div"
      >
        {slotSelectedTime}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_input_wrap")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "slot_inputs")} tag="div">
          {slotTimeinputs}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotButton ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "outline_button")}
              tag="div"
            >
              <Text content="Add" weight="" />
            </_Builtin.Block>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
