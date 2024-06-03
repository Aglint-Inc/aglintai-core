"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./InterviewerPage.module.css";

export function InterviewerPage({
  as: _Component = _Builtin.Block,
  textInterviewDetail = "This module aims to evaluate candidates' ability to write efficient, maintainable, and bug-free C++ code, covering a range of topics such as syntax, data structures, algorithms, object-oriented programming concepts, memory management, and best practices.",
  slotDarkPill,
  slotInterviewerDetail,
}) {
  return (
    <_Component className={_utils.cx(_styles, "interviewer-page")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1430")}
        tag="div"
      >
        <Text content={textInterviewDetail} weight="" color="neutral" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1431")}
        tag="div"
      >
        {slotDarkPill}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1432")}
        tag="div"
      >
        {slotInterviewerDetail}
      </_Builtin.Block>
    </_Component>
  );
}
