"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
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
      <Text content={textFeedback} />
      <_Builtin.Block
        className={_utils.cx(_styles, "cvs-score-detail-count-block")}
        tag="div"
      >
        <Text content={textScoreState} weight="medium" />
      </_Builtin.Block>
    </_Component>
  );
}
