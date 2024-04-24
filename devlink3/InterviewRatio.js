"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { DropdownButton } from "./DropdownButton";
import { GraphButtonOption } from "./GraphButtonOption";
import * as _utils from "./utils";
import _styles from "./InterviewRatio.module.css";

export function InterviewRatio({
  as: _Component = _Builtin.Block,
  slotInterviewGraph,
  slotDropdownButton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1464")}
      id={_utils.cx(
        _styles,
        "w-node-_48316e3f-68f1-8ccc-8fa3-ec4c80bf3fc0-80bf3fc0"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1465")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1473")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1593")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Interview to offer ratio"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {
                "Ratio of candidates advancing after interviews to the number of schedules."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1594")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1590")}
              tag="div"
            >
              {slotDropdownButton ?? (
                <>
                  <DropdownButton />
                  <GraphButtonOption />
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1595")}
        tag="div"
      >
        {slotInterviewGraph}
      </_Builtin.Block>
    </_Component>
  );
}
