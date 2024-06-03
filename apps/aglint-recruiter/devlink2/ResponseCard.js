"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ResponseCard.module.css";

export function ResponseCard({
  as: _Component = _Builtin.Block,
  slotIcon,
  textQuestion = "Have you completed the following degree: Bachelors Degree?",
  textAnswer = "Yes",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1023")} tag="div">
      <_Builtin.Block tag="div">{slotIcon}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1024")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {textQuestion}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{textAnswer}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
