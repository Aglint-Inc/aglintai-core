"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { LoadedSlots } from "./LoadedSlots";
import * as _utils from "./utils";
import _styles from "./ScheduleInterviewLoadedSlots.module.css";

export function ScheduleInterviewLoadedSlots({
  as: _Component = _Builtin.Block,
  textDate = "February 2024",
  slotLoadedSlots,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-860")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "text-grey-600")} tag="div">
        {
          "The interview panel has confirmed the following available slots. Candidates can select from these options to schedule their interviews."
        }
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-861")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-867")}
          tag="div"
        >
          {slotLoadedSlots ?? <LoadedSlots />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
