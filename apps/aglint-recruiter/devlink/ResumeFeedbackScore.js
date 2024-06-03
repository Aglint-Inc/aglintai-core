"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ResumeFeedbackScore.module.css";

export function ResumeFeedbackScore({
  as: _Component = _Builtin.Block,
  textFeedback = "Summary",
  textScoreState = "Good",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cvs-score-details-block")}
      tag="div"
    >
      <_Builtin.Block tag="div">{textFeedback}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cvs-score-detail-count-block")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textScoreState}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
