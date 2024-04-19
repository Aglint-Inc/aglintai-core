"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewTaskPill.module.css";

export function InterviewTaskPill({
  as: _Component = _Builtin.Block,
  textInterviewName = "Schedule",
  onClickPill = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "coding-seesion-interview")}
      tag="div"
      {...onClickPill}
    >
      <_Builtin.Block tag="div">{textInterviewName}</_Builtin.Block>
    </_Component>
  );
}
