import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewCordinator.module.css";

export function InterviewCordinator({
  as: _Component = _Builtin.Block,
  slotInput,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1239")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {"Interview Coordinator"}
      </_Builtin.Block>
      <_Builtin.Block tag="div">{slotInput}</_Builtin.Block>
    </_Component>
  );
}
