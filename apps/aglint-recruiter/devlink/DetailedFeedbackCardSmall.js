"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DetailedFeedbackCardSmall.module.css";

export function DetailedFeedbackCardSmall({
  as: _Component = _Builtin.Block,
  textHeader = "Language quality",
  textScorePercentage = "50%",
  slotScore,
  textDescription = "Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.",
  textColorScore = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "lan-analysis-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "lan-analysis-header-card",
          "space-between"
        )}
        tag="div"
      >
        <_Builtin.Block tag="div">{textHeader}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "lan-analysis-score-block-detailed")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-304", "width-10")}
            tag="div"
          >
            {slotScore}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "fw-semibold")}
            tag="div"
            {...textColorScore}
          >
            {textScorePercentage}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "text-grey-600")} tag="div">
        {textDescription}
      </_Builtin.Block>
    </_Component>
  );
}
