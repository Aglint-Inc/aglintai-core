"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewFeedbackScore.module.css";

export function InterviewFeedbackScore({
  as: _Component = _Builtin.Block,
  textFeedback = "Language quality",
  slotScore,
  textScorePercentage = "50%",
  textScoreColorProps = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "lan-analysis-header-block")}
      tag="div"
    >
      <_Builtin.Block tag="div">{textFeedback}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "lan-analysis-score-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-304")}
          tag="div"
        >
          {slotScore}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "text-yellow-500")}
          tag="div"
          {...textScoreColorProps}
        >
          {textScorePercentage}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
