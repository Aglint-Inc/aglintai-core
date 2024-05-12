"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SessionAndTime.module.css";

export function SessionAndTime({
  as: _Component = _Builtin.Block,
  textTime = "09:00 AM to 09:30 PM",
  textSessionName = "Personality and culture",
}) {
  return (
    <_Component className={_utils.cx(_styles, "session_and_time")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "text-grey-600")} tag="div">
        {textTime}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {textSessionName}
      </_Builtin.Block>
    </_Component>
  );
}
