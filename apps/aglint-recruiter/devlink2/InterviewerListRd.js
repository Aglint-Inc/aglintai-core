"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewerListRd.module.css";

export function InterviewerListRd({
  as: _Component = _Builtin.Block,
  slotStatus,
  slotTextWithIcon,
  slotIconButtonSoft,
}) {
  return (
    <_Component className={_utils.cx(_styles, "interviewer-rd-card")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "interviewer-rd-left-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div">{slotStatus}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "interview-rd-text-icon")}
          tag="div"
        >
          {slotTextWithIcon}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">{slotIconButtonSoft}</_Builtin.Block>
    </_Component>
  );
}
