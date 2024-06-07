"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
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
        <_Builtin.Block tag="div">{"My Schedules"}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "team-landing-body-wrap")}
        tag="div"
      >
        {slotMyScheduleLanding ?? <MyScheduleLanding />}
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A.team-landing-body-wrap%7B%0Aheight%3Acalc(100vh%20-%2060px)%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
