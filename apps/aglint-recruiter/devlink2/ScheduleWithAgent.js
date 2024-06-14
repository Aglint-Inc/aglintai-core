"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ScheduleWithAgent.module.css";

export function ScheduleWithAgent({
  as: _Component = _Builtin.Block,
  onClickPhoneAgent = {},
  onClickEmailAgent = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1283")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cursor-pointer")}
        tag="div"
        {...onClickPhoneAgent}
      >
        {"Schedule with phone agent"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cursor-pointer")}
        tag="div"
        {...onClickEmailAgent}
      >
        {"Schedule with email agent"}
      </_Builtin.Block>
    </_Component>
  );
}
