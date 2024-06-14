"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ScrQuestionDefault } from "./ScrQuestionDefault";
import { ScrQuestionEdit } from "./ScrQuestionEdit";
import * as _utils from "./utils";
import _styles from "./ScrQuestion.module.css";

export function ScrQuestion({
  as: _Component = _Builtin.Block,
  slotDefault,
  slotEdit,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "scr-question-wrapper")}
      tag="div"
    >
      <_Builtin.Block tag="div">
        {slotDefault ?? <ScrQuestionDefault isRequired={true} />}
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        {slotEdit ?? <ScrQuestionEdit />}
      </_Builtin.Block>
    </_Component>
  );
}
