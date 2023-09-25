import React from "react";
import * as _Builtin from "./_Builtin";
import { InterviewStart } from "./InterviewStart";
import * as _utils from "./utils";
import _styles from "./InterviewStartScreen.module.css";

export function InterviewStartScreen({
  as: _Component = _Builtin.Block,
  slotInterviewStart,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "interview-new-strart-screen")}
      tag="div"
    >
      <_Builtin.Block tag="div">
        {slotInterviewStart ?? <InterviewStart />}
      </_Builtin.Block>
    </_Component>
  );
}
