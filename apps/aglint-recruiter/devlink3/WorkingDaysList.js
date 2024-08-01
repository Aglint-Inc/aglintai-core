"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./WorkingDaysList.module.css";

export function WorkingDaysList({
  as: _Component = _Builtin.Block,
  textDay = "Wednesday",
  textTime = "This is a global text component",
}) {
  return (
    <_Component className={_utils.cx(_styles, "whd-day-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "working-hour-half-day-left")}
        tag="div"
      >
        <Text content={textDay} weight="regular" color="neutral" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "working-hour-day-right")}
        tag="div"
      >
        <Text content={textTime} weight="regular" />
      </_Builtin.Block>
    </_Component>
  );
}
