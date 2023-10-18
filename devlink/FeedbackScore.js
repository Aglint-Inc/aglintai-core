import React from "react";
import * as _Builtin from "./_Builtin";
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
      <_Builtin.Block tag="div">{textFeedback}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cvs-score-detail-count-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-489")}
          tag="div"
        >
          {slotFeedbackScoreGraphs}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold")}
          tag="div"
          {...propsTextScore}
        >
          {textScorePercentage}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
