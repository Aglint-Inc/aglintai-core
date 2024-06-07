"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { MyScheduleLanding } from "./MyScheduleLanding";
import * as _utils from "./utils";
import _styles from "./DeleteMySchedule.module.css";

export function DeleteMySchedule({
  as: _Component = _Builtin.Block,
  slotMyScheduleLanding,
}) {
  return (
    <_Component className={_utils.cx(_styles, "team-landing-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "team-landing-header")}
        tag="div"
      >
        <Text content="My Schedules" weight="medium" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "team-landing-body-wrap")}
        tag="div"
      >
        {slotMyScheduleLanding ?? <MyScheduleLanding />}
      </_Builtin.Block>
    </_Component>
  );
}
