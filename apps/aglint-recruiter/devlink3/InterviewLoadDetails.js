"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { InterviewLoadCard } from "./InterviewLoadCard";
import * as _utils from "./utils";
import _styles from "./InterviewLoadDetails.module.css";

export function InterviewLoadDetails({
  as: _Component = _Builtin.Block,
  slotEdit,
  slotInterviewLoadCard,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "interview-load-details-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "ild-header-wrap")}
        tag="div"
      >
        <Text content="Interview Load" />
        <_Builtin.Block tag="div">{slotEdit}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "interview-load-details-card")}
        tag="div"
      >
        {slotInterviewLoadCard ?? <InterviewLoadCard />}
      </_Builtin.Block>
    </_Component>
  );
}
