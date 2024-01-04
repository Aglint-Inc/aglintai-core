import React from "react";
import * as _Builtin from "./_Builtin";
import { ScorePercentage } from "./ScorePercentage";
import { ButtonOutlinedRegular } from "./ButtonOutlinedRegular";
import * as _utils from "./utils";
import _styles from "./ScoreWeightage.module.css";

export function ScoreWeightage({
  as: _Component = _Builtin.Block,
  slotScoreWheel,
  slotScorePercent,
  onClickEqualize = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "right-score-card")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "fw-semibold", "text-align-center")}
        tag="div"
      >
        {"Score Weightage"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-score-wrap")}
        tag="div"
      >
        {slotScoreWheel}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-664")} tag="div">
        {slotScorePercent ?? <ScorePercentage />}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-665")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-666")}
          tag="div"
        >
          <_Builtin.Block tag="div" {...onClickEqualize}>
            <ButtonOutlinedRegular textLabel="Equalise" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"%"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
