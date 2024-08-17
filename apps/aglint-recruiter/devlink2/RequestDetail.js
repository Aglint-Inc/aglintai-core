"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { AiTaskBanner } from "./AiTaskBanner";
import { RequestDetailRight } from "./RequestDetailRight";
import * as _utils from "./utils";
import _styles from "./RequestDetail.module.css";

export function RequestDetail({
  as: _Component = _Builtin.Block,
  slotInterview,
  slotNewTask,
  slotRequestDetailRight,
}) {
  return (
    <_Component className={_utils.cx(_styles, "request-detail-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "req-detail-left-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "req-detail-left-card")}
          tag="div"
        >
          <Text color="neutral" content="Interviews" />
          <_Builtin.Block
            className={_utils.cx(_styles, "req-detail-left-interview")}
            tag="div"
          >
            {slotInterview}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "req-detail-left-card")}
          tag="div"
        >
          <Text color="neutral" content="Next Tasks" />
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-req-detail-left-card")}
            tag="div"
          >
            {slotNewTask ?? <AiTaskBanner />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "req-detail-right-wrap")}
        tag="div"
      >
        {slotRequestDetailRight ?? <RequestDetailRight />}
      </_Builtin.Block>
    </_Component>
  );
}
