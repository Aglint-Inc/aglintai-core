"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewAiTranscriptCard.module.css";

export function InterviewAiTranscriptCard({
  as: _Component = _Builtin.Block,
  slotAiImage,
  textAiName = "Interviewer",
  textAiScript = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "int-ts-transcript-block")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "int-ts-transcript-header-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "int-ts-image-block")}
          tag="div"
        >
          {slotAiImage}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-700-2")}
          tag="div"
        >
          {textAiName}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block tag="div">{textAiScript}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
