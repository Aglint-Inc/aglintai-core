"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./FeedbackScore.module.css";

export function FeedbackScore({
  as: _Component = _Builtin.Block,
  textFeedback = "Language quality",
  slotFeedbackScoreGraphs,
  textScorePercentage = "50%",
  propsTextScore = {},
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
        <_Builtin.Block
          className={_utils.cx(_styles, "score-detail-icon-wrap")}
          tag="div"
        >
          {slotFeedbackScoreGraphs}
        </_Builtin.Block>
        <_Builtin.Block tag="div" {...propsTextScore}>
          <Text content={textScorePercentage} size="1" weight="medium" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
