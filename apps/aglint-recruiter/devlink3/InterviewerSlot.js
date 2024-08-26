"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewerSlot.module.css";

export function InterviewerSlot({
  as: _Component = _Builtin.Block,
  propsColor = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "interviewer-slot-div")}
      tag="div"
      {...propsColor}
    />
  );
}
