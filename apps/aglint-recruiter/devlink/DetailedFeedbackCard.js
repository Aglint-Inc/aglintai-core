"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DetailedFeedbackCard.module.css";

export function DetailedFeedbackCard({
  as: _Component = _Builtin.Block,
  textHeader = "Language quality",
  textDescription = "Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.",
  slotScore,
  textScorePercentage = "50%",
  textColorScore = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "lan-analysis-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "lan-analysis-header-card")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "text-lg")} tag="div">
          {textHeader}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "lan-analysis-score-block-detailed")}
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
