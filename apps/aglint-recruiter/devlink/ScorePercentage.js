"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ScorePercentage.module.css";

export function ScorePercentage({
  as: _Component = _Builtin.Block,
  textTitle = "Skills",
  colorPropsBg = {},
  slotInputPercent,
}) {
  return (
    <_Component className={_utils.cx(_styles, "skill-wrap-score")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "indicate-wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "indicator-box", "purple")}
          tag="div"
          {...colorPropsBg}
        />
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textTitle}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-695")} tag="div">
        <_Builtin.Block tag="div">{slotInputPercent}</_Builtin.Block>
        <_Builtin.Block tag="div">{"%"}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
