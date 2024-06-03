"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CandidateQuestion.module.css";

export function CandidateQuestion({
  as: _Component = _Builtin.Block,
  textQuestionCount = "Question 01/07",
  textQuestion = "During a meeting, a colleague consistently interrupts and talks over others, hindering productive discussions. How would you handle this situation?",
  textRightTitle = "Select one or more answer",
  slotRightInput,
  isTextRightTitleVisible = true,
  textQuestionDesc = "Answer this question by selecting only one answer or any description provided will show up here.",
  isQuestionDescVisibe = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "question-ans-grid")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "question-wrap-grid")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "text-grey-400")}
          tag="div"
        >
          {textQuestionCount}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-999")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {textQuestion}
          </_Builtin.Block>
          {isQuestionDescVisibe ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {textQuestionDesc}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "ans-wrap-grid")} tag="div">
        {isTextRightTitleVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "text-grey-400")}
            tag="div"
          >
            {textRightTitle}
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block tag="div">{slotRightInput}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
