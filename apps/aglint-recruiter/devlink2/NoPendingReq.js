"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./NoPendingReq.module.css";

export function NoPendingReq({
  as: _Component = _Builtin.Block,
  textHeader = "Request-Free Breeze",
  textDesc = "All caught up with no pending requests. Breathe easy!",
}) {
  return (
    <_Component className={_utils.cx(_styles, "schedule-req-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "schedule-req-sub-wrap")}
        tag="div"
      >
        <Text content="😴" size="8" />
        <Text content={textHeader} size="4" />
        <Text content={textDesc} weight="regular" color="neutral" />
      </_Builtin.Block>
    </_Component>
  );
}
