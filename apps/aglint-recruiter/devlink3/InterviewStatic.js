"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewStatic.module.css";

export function InterviewStatic({
  as: _Component = _Builtin.Block,
  textHeader = "Candidate Satisfaction",
  textNumber = "3.2",
  textSmallNumber = "out of 5",
  textDesc = "Candidate satisfaction rate from feedback submission",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1485")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {textHeader}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1505")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "text-40",
            "fw-semibold",
            "text-kale-600"
          )}
          tag="div"
        >
          {textNumber}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{textSmallNumber}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "text-grey-600")} tag="div">
        {textDesc}
      </_Builtin.Block>
    </_Component>
  );
}
