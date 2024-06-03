"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AiTranscript } from "./AiTranscript";
import { UserTranscript } from "./UserTranscript";
import * as _utils from "./utils";
import _styles from "./InterviewTranscriptCard.module.css";

export function InterviewTranscriptCard({
  as: _Component = _Builtin.Block,
  slotAiTranscript,
  slotUserTranscript,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "all-interview-script-card")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-transcript-ai")}
        tag="div"
      >
        {slotAiTranscript ?? <AiTranscript />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-transcript-user")}
        tag="div"
      >
        {slotUserTranscript ?? <UserTranscript />}
      </_Builtin.Block>
    </_Component>
  );
}
