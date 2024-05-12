import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewTimer.module.css";

export function InterviewTimer({
  as: _Component = _Builtin.Block,
  timeText = "02 : 30",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "interview-time-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "interview-dot")}
        tag="div"
      />
      <_Builtin.Block tag="div">{timeText}</_Builtin.Block>
    </_Component>
  );
}
