"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { NewScheduleCard } from "./NewScheduleCard";
import * as _utils from "./utils";
import _styles from "./YourSchedules.module.css";

export function YourSchedules({
  as: _Component = _Builtin.Block,
  slotScheduleCard,
  onClickViewSchedules = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1463")}
      id={_utils.cx(
        _styles,
        "w-node-eb3cd8e1-cb61-973f-0a51-f6ba34f8287c-34f8287c"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1466")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Your schedules"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1489")}
          tag="div"
        >
          {slotScheduleCard ?? <NewScheduleCard />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "text-blue-500",
          "text-underline",
          "cursor-pointer"
        )}
        tag="div"
        {...onClickViewSchedules}
      >
        {"View all my Schedules"}
      </_Builtin.Block>
    </_Component>
  );
}
