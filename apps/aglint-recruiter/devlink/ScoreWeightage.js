"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ScorePercentage } from "./ScorePercentage";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./ScoreWeightage.module.css";

export function ScoreWeightage({
  as: _Component = _Builtin.Block,
  slotScoreWheel,
  slotScorePercent,
  onClickEqualize = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "score-weightage-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "right-score-card")}
        tag="div"
      >
        <Text content="Score Weightage" weight="medium" align="center" />
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-score-wrap")}
          tag="div"
        >
          {slotScoreWheel}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sw-slot-score")}
          tag="div"
        >
          {slotScorePercent ?? <ScorePercentage />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sw-button-wrap")}
          tag="div"
        >
          <_Builtin.Block tag="div" {...onClickEqualize}>
            <ButtonSolid
              isRightIcon={false}
              isLeftIcon={false}
              size="2"
              textButton="Reset"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
