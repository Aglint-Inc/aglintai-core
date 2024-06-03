"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JobAssistCardSmall.module.css";

export function JobAssistCardSmall({
  as: _Component = _Builtin.Block,
  textSuggestion = "Location in San Fransisco",
  onClickCard = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "initial-prompt-block", "small")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block tag="div">{textSuggestion}</_Builtin.Block>
    </_Component>
  );
}
